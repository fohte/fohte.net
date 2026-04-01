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

import {
  loadRelatedPosts,
  type Logger,
  relatedPostsLoader,
} from '@/lib/related-posts-loader'

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

function createMockLogger(): Logger & {
  infoMessages: string[]
  warnMessages: string[]
} {
  const infoMessages: string[] = []
  const warnMessages: string[] = []
  return {
    infoMessages,
    warnMessages,
    info: (msg: string) => {
      infoMessages.push(msg)
    },
    warn: (msg: string) => {
      warnMessages.push(msg)
    },
  }
}

describe('loadRelatedPosts', () => {
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

  it('loads posts and returns related post data correctly', async () => {
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

    const logger = createMockLogger()
    const result = await loadRelatedPosts(
      { postsDir, embeddingsDir, maxRelatedPosts: 2 },
      logger,
    )

    // Verify result structure
    expect(result.totalPosts).toBe(3)
    expect(result.apiCalls).toBe(3)
    expect(result.cacheHits).toBe(0)
    expect(result.skippedPosts).toBe(0)

    // Verify each post has related posts
    for (const slug of ['post-a', 'post-b', 'post-c']) {
      const related = result.relatedPostsMap[slug]
      expect(related).toBeDefined()
      expect(related).toHaveLength(2)
      // Each related slug should not be the post itself
      for (const entry of related) {
        expect(entry.slug).not.toBe(slug)
        expect(typeof entry.score).toBe('number')
      }
    }

    // Verify API was called 3 times (no cache)
    expect(mockGenerateEmbedding).toHaveBeenCalledTimes(3)

    // Verify logger output
    expect(logger.infoMessages.some((m) => m.includes('3 MDX files'))).toBe(
      true,
    )
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

    mockGenerateEmbedding
      .mockResolvedValueOnce({ vector: makeVector(10), totalTokens: 10 })
      .mockResolvedValueOnce({ vector: makeVector(20), totalTokens: 10 })

    const logger1 = createMockLogger()

    // First run: all API calls
    const result1 = await loadRelatedPosts(
      { postsDir, embeddingsDir, maxRelatedPosts: 1 },
      logger1,
    )
    expect(result1.apiCalls).toBe(2)
    expect(result1.cacheHits).toBe(0)

    // Reset mock
    mockGenerateEmbedding.mockReset()

    // Modify only post-x
    await writeFile(
      path.join(postsDir, 'post-x.mdx'),
      makeMdxContent('Post X', 'Updated content for X'),
    )

    mockGenerateEmbedding.mockResolvedValueOnce({
      vector: makeVector(30),
      totalTokens: 10,
    })

    const logger2 = createMockLogger()

    // Second run: only post-x should trigger API call
    const result2 = await loadRelatedPosts(
      { postsDir, embeddingsDir, maxRelatedPosts: 1 },
      logger2,
    )

    // Only 1 API call (post-x changed, post-y cache hit)
    expect(result2.apiCalls).toBe(1)
    expect(result2.cacheHits).toBe(1)
    expect(mockGenerateEmbedding).toHaveBeenCalledTimes(1)
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

    const logger = createMockLogger()
    const result = await loadRelatedPosts(
      { postsDir, embeddingsDir, maxRelatedPosts: 5 },
      logger,
    )

    expect(result.totalPosts).toBe(1)
    expect(mockGenerateEmbedding).toHaveBeenCalledTimes(1)
  })

  it('uses default maxRelatedPosts of 5', async () => {
    // Create 7 posts
    for (let i = 0; i < 7; i++) {
      await writeFile(
        path.join(postsDir, `post-${String(i)}.mdx`),
        makeMdxContent(`Post ${String(i)}`, `Content ${String(i)}`),
      )
      mockGenerateEmbedding.mockResolvedValueOnce({
        vector: makeVector(i * 10),
        totalTokens: 10,
      })
    }

    const logger = createMockLogger()
    const result = await loadRelatedPosts(
      { postsDir, embeddingsDir, maxRelatedPosts: 5 },
      logger,
    )

    // Each post should have at most 5 related posts (6 others, capped at 5)
    for (const related of Object.values(result.relatedPostsMap)) {
      expect(related.length).toBeLessThanOrEqual(5)
    }
  })

  it('skips posts gracefully when API key is not configured', async () => {
    await writeFile(
      path.join(postsDir, 'post.mdx'),
      makeMdxContent('Post', 'Content'),
    )

    mockGenerateEmbedding.mockResolvedValueOnce(null)

    const logger = createMockLogger()
    const result = await loadRelatedPosts(
      { postsDir, embeddingsDir, maxRelatedPosts: 5 },
      logger,
    )

    // Post should be skipped
    expect(result.totalPosts).toBe(0)
    expect(result.skippedPosts).toBe(1)
    expect(
      logger.warnMessages.some((m) => m.includes('API key not configured')),
    ).toBe(true)
  })
})

describe('relatedPostsLoader', () => {
  it('returns the correct loader name', () => {
    const loader = relatedPostsLoader()
    expect(loader.name).toBe('related-posts-loader')
  })

  it('exposes the schema', () => {
    const loader = relatedPostsLoader()
    expect(loader).toHaveProperty('schema')
  })
})
