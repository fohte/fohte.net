import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from 'vitest'

import { relatedPostsLoader } from '@/lib/related-posts-loader'

// Mock voyage-embeddings to avoid real API calls
const mockGenerateEmbedding = vi.fn()

vi.mock('@/lib/voyage-embeddings', () => ({
  generateEmbedding: (...args: unknown[]) =>
    mockGenerateEmbedding(...args) as unknown,
}))

function makeVector(seed: number, dimensions: number = 1024): number[] {
  return Array.from({ length: dimensions }, (_, i) => Math.sin(seed + i))
}

function makeMdxContent(title: string, body: string): string {
  return `---\ntitle: "${title}"\ndate: 2024-01-01\n---\n\n${body}\n`
}

interface StoreEntry {
  id: string
  data: Record<string, unknown>
  digest?: string
}

function createMockStore() {
  const entries = new Map<string, StoreEntry>()
  const clearFn = vi.fn(() => {
    entries.clear()
  })
  const setFn = vi.fn((entry: StoreEntry) => {
    entries.set(entry.id, entry)
    return true
  })
  return {
    entries,
    clear: clearFn,
    set: setFn,
    get: vi.fn((key: string) => entries.get(key)),
    has: vi.fn((key: string) => entries.has(key)),
    delete: vi.fn((key: string) => entries.delete(key)),
    keys: vi.fn(() => [...entries.keys()]),
    values: vi.fn(() => [...entries.values()]),
  }
}

function createMockContext(store: ReturnType<typeof createMockStore>) {
  const infoFn = vi.fn()
  const warnFn = vi.fn()
  return {
    context: {
      store,
      logger: {
        info: infoFn,
        warn: warnFn,
        error: vi.fn(),
        debug: vi.fn(),
        label: 'related-posts-loader',
        fork: vi.fn(),
      },
      parseData: vi.fn(({ data }: { id: string; data: unknown }) =>
        Promise.resolve(data),
      ),
      generateDigest: vi.fn((data: unknown) => JSON.stringify(data)),
      meta: {},
      config: {},
      collection: 'relatedPosts',
    },
    infoFn,
    warnFn,
  }
}

describe('relatedPostsLoader', () => {
  let tmpDir: string
  let postsDir: string
  let embeddingsDir: string
  let warnSpy: MockInstance

  beforeEach(async () => {
    tmpDir = await mkdtemp(path.join(tmpdir(), 'related-posts-loader-test-'))
    postsDir = path.join(tmpDir, 'posts')
    embeddingsDir = path.join(tmpDir, 'embeddings')
    await mkdir(postsDir, { recursive: true })

    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockGenerateEmbedding.mockReset()
  })

  afterEach(async () => {
    warnSpy.mockRestore()
    await rm(tmpDir, { recursive: true, force: true })
  })

  it('loads posts and stores related post data correctly', async () => {
    // Create 3 test MDX files
    await writeFile(
      path.join(postsDir, 'post-a.mdx'),
      makeMdxContent('Post A', 'Content about TypeScript and React'),
    )
    await writeFile(
      path.join(postsDir, 'post-b.mdx'),
      makeMdxContent('Post B', 'Content about TypeScript and Node'),
    )
    await writeFile(
      path.join(postsDir, 'post-c.mdx'),
      makeMdxContent('Post C', 'Content about cooking recipes'),
    )

    // Mock embedding generation
    mockGenerateEmbedding
      .mockResolvedValueOnce({ vector: makeVector(1), totalTokens: 10 })
      .mockResolvedValueOnce({ vector: makeVector(2), totalTokens: 10 })
      .mockResolvedValueOnce({ vector: makeVector(3), totalTokens: 10 })

    const loader = relatedPostsLoader({
      postsDir,
      embeddingsDir,
      maxRelatedPosts: 2,
    })

    const store = createMockStore()
    const { context, infoFn } = createMockContext(store)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- mock context
    await loader.load(context as never)

    // Verify store was populated
    expect(store.clear).toHaveBeenCalled()
    expect(store.set).toHaveBeenCalledTimes(3)

    // Verify each entry has the correct structure
    for (const slug of ['post-a', 'post-b', 'post-c']) {
      const entry = store.entries.get(slug)
      expect(entry).toBeDefined()
      expect(entry?.data).toHaveProperty('slug', slug)
      const relatedSlugs = entry?.data.relatedSlugs
      expect(relatedSlugs).toHaveLength(2)
      expect(Array.isArray(relatedSlugs)).toBe(true)
      if (Array.isArray(relatedSlugs)) {
        for (const related of relatedSlugs) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- dynamic test data
          expect(related.slug).not.toBe(slug)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- dynamic test data
          expect(typeof related.score).toBe('number')
        }
      }
    }

    // Verify API was called 3 times (no cache)
    expect(mockGenerateEmbedding).toHaveBeenCalledTimes(3)

    // Verify logger output
    expect(infoFn).toHaveBeenCalledWith(expect.stringContaining('3 MDX files'))
    expect(infoFn).toHaveBeenCalledWith(expect.stringContaining('0 cache hits'))
    expect(infoFn).toHaveBeenCalledWith(expect.stringContaining('3 API calls'))
  })

  it('uses cache on second run and only regenerates changed posts', async () => {
    // Create 2 test MDX files
    await writeFile(
      path.join(postsDir, 'post-x.mdx'),
      makeMdxContent('Post X', 'Original content for X'),
    )
    await writeFile(
      path.join(postsDir, 'post-y.mdx'),
      makeMdxContent('Post Y', 'Original content for Y'),
    )

    const vectorX = makeVector(10)
    const vectorY = makeVector(20)

    mockGenerateEmbedding
      .mockResolvedValueOnce({ vector: vectorX, totalTokens: 10 })
      .mockResolvedValueOnce({ vector: vectorY, totalTokens: 10 })

    const loader = relatedPostsLoader({
      postsDir,
      embeddingsDir,
      maxRelatedPosts: 1,
    })

    const store1 = createMockStore()
    const { context: context1 } = createMockContext(store1)

    // First run: all API calls
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-type-assertion -- mock context
    await loader.load(context1 as never)
    expect(mockGenerateEmbedding).toHaveBeenCalledTimes(2)

    // Reset mock
    mockGenerateEmbedding.mockReset()

    // Modify only post-x
    await writeFile(
      path.join(postsDir, 'post-x.mdx'),
      makeMdxContent('Post X', 'Updated content for X'),
    )

    const newVectorX = makeVector(30)
    mockGenerateEmbedding.mockResolvedValueOnce({
      vector: newVectorX,
      totalTokens: 10,
    })

    const store2 = createMockStore()
    const { context: context2, infoFn: infoFn2 } = createMockContext(store2)

    // Second run: only post-x should trigger API call
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-type-assertion -- mock context
    await loader.load(context2 as never)

    // Only 1 API call (post-x changed, post-y cache hit)
    expect(mockGenerateEmbedding).toHaveBeenCalledTimes(1)

    // Verify logging shows 1 cache hit and 1 API call
    expect(infoFn2).toHaveBeenCalledWith(
      expect.stringContaining('1 cache hits'),
    )
    expect(infoFn2).toHaveBeenCalledWith(expect.stringContaining('1 API calls'))
  })

  it('only processes .mdx files', async () => {
    await writeFile(
      path.join(postsDir, 'post.mdx'),
      makeMdxContent('Post', 'Content'),
    )
    await writeFile(path.join(postsDir, 'readme.md'), '# Readme')
    await writeFile(path.join(postsDir, 'data.json'), '{}')

    mockGenerateEmbedding.mockResolvedValueOnce({
      vector: makeVector(1),
      totalTokens: 10,
    })

    const loader = relatedPostsLoader({ postsDir, embeddingsDir })
    const store = createMockStore()
    const { context } = createMockContext(store)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- mock context
    await loader.load(context as never)

    expect(store.set).toHaveBeenCalledTimes(1)
    expect(mockGenerateEmbedding).toHaveBeenCalledTimes(1)
  })

  it('uses default maxRelatedPosts of 5', async () => {
    // Create 7 posts
    const vectors: number[][] = []
    for (let i = 0; i < 7; i++) {
      await writeFile(
        path.join(postsDir, `post-${String(i)}.mdx`),
        makeMdxContent(`Post ${String(i)}`, `Content ${String(i)}`),
      )
      vectors.push(makeVector(i * 10))
    }

    for (const v of vectors) {
      mockGenerateEmbedding.mockResolvedValueOnce({
        vector: v,
        totalTokens: 10,
      })
    }

    const loader = relatedPostsLoader({ postsDir, embeddingsDir })
    const store = createMockStore()
    const { context } = createMockContext(store)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- mock context
    await loader.load(context as never)

    // Each post should have at most 5 related posts
    for (const [, entry] of store.entries) {
      const relatedSlugs = entry.data.relatedSlugs
      expect(Array.isArray(relatedSlugs)).toBe(true)
      if (Array.isArray(relatedSlugs)) {
        expect(relatedSlugs.length).toBeLessThanOrEqual(5)
      }
    }
  })

  it('skips posts gracefully when API key is not configured', async () => {
    await writeFile(
      path.join(postsDir, 'post.mdx'),
      makeMdxContent('Post', 'Content'),
    )

    mockGenerateEmbedding.mockResolvedValueOnce(null)

    const loader = relatedPostsLoader({ postsDir, embeddingsDir })
    const store = createMockStore()
    const { context, warnFn, infoFn } = createMockContext(store)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- mock context
    await loader.load(context as never)

    // Post should be skipped, store should be empty
    expect(store.set).not.toHaveBeenCalled()
    expect(warnFn).toHaveBeenCalledWith(
      expect.stringContaining('API key not configured'),
    )
    expect(infoFn).toHaveBeenCalledWith(expect.stringContaining('1 skipped'))
  })

  it('returns the correct loader name', () => {
    const loader = relatedPostsLoader()
    expect(loader.name).toBe('related-posts-loader')
  })
})
