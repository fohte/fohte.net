import { existsSync } from 'node:fs'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
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
  getOrCreateEmbedding,
  readEmbeddingCache,
  writeEmbeddingCache,
} from '@/lib/embedding-cache'

function makeVector(dimensions: number = 1024): number[] {
  return Array.from({ length: dimensions }, (_, i) => i * 0.001)
}

function makeCacheFileContent(cacheKey: string, vector: number[]): string {
  return [cacheKey, ...vector.map(String)].join('\n') + '\n'
}

describe('readEmbeddingCache', () => {
  let tmpDir: string
  let warnSpy: MockInstance

  beforeEach(async () => {
    tmpDir = await mkdtemp(path.join(tmpdir(), 'embedding-cache-test-'))
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(async () => {
    warnSpy.mockRestore()
    await rm(tmpDir, { recursive: true, force: true })
  })

  it('returns the vector when cache key matches', async () => {
    const vector = makeVector()
    const cacheKey = 'voyage-4:abc123'
    await writeFile(
      path.join(tmpDir, 'my-post.vec'),
      makeCacheFileContent(cacheKey, vector),
      'utf-8',
    )

    const result = await readEmbeddingCache('my-post', cacheKey, tmpDir)

    expect(result).toEqual(vector)
  })

  it('returns null when file does not exist', async () => {
    const result = await readEmbeddingCache('missing', 'voyage-4:abc', tmpDir)

    expect(result).toBeNull()
  })

  it('returns null when cache key does not match', async () => {
    const vector = makeVector()
    await writeFile(
      path.join(tmpDir, 'my-post.vec'),
      makeCacheFileContent('voyage-4:old-hash', vector),
      'utf-8',
    )

    const result = await readEmbeddingCache(
      'my-post',
      'voyage-4:new-hash',
      tmpDir,
    )

    expect(result).toBeNull()
    // File should not be deleted on key mismatch
    expect(existsSync(path.join(tmpDir, 'my-post.vec'))).toBe(true)
  })

  it('deletes corrupted file with wrong number of lines and returns null', async () => {
    const filePath = path.join(tmpDir, 'broken.vec')
    await writeFile(filePath, 'voyage-4:abc\n0.1\n0.2\n', 'utf-8')

    const result = await readEmbeddingCache('broken', 'voyage-4:abc', tmpDir)

    expect(result).toBeNull()
    expect(existsSync(filePath)).toBe(false)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Corrupted cache file'),
    )
  })

  it('deletes corrupted file with non-numeric values and returns null', async () => {
    const lines = [
      'voyage-4:abc',
      ...Array.from({ length: 1024 }, (_, i) =>
        i === 500 ? 'not-a-number' : String(i * 0.001),
      ),
    ]
    const filePath = path.join(tmpDir, 'bad-values.vec')
    await writeFile(filePath, lines.join('\n') + '\n', 'utf-8')

    const result = await readEmbeddingCache(
      'bad-values',
      'voyage-4:abc',
      tmpDir,
    )

    expect(result).toBeNull()
    expect(existsSync(filePath)).toBe(false)
  })
})

describe('writeEmbeddingCache', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await mkdtemp(path.join(tmpdir(), 'embedding-cache-test-'))
  })

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true })
  })

  it('creates the file with correct format', async () => {
    const vector = makeVector()
    const cacheKey = 'voyage-4:abc123'

    await writeEmbeddingCache('my-post', cacheKey, vector, tmpDir)

    const content = await readFile(path.join(tmpDir, 'my-post.vec'), 'utf-8')
    expect(content).toBe(makeCacheFileContent(cacheKey, vector))
  })

  it('creates the directory if it does not exist', async () => {
    const nestedDir = path.join(tmpDir, 'nested', 'dir')
    const vector = makeVector()

    await writeEmbeddingCache('post', 'voyage-4:abc', vector, nestedDir)

    expect(existsSync(path.join(nestedDir, 'post.vec'))).toBe(true)
  })
})

describe('getOrCreateEmbedding', () => {
  let tmpDir: string
  let warnSpy: MockInstance
  const originalEnv = process.env.FORCE_REGENERATE_EMBEDDINGS

  beforeEach(async () => {
    tmpDir = await mkdtemp(path.join(tmpdir(), 'embedding-cache-test-'))
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    delete process.env.FORCE_REGENERATE_EMBEDDINGS
  })

  afterEach(async () => {
    warnSpy.mockRestore()
    await rm(tmpDir, { recursive: true, force: true })
    if (originalEnv !== undefined) {
      process.env.FORCE_REGENERATE_EMBEDDINGS = originalEnv
    } else {
      delete process.env.FORCE_REGENERATE_EMBEDDINGS
    }
  })

  it('returns cached vector without calling generate on cache hit', async () => {
    const vector = makeVector()
    const cacheKey = 'voyage-4:abc'
    await writeFile(
      path.join(tmpDir, 'post.vec'),
      makeCacheFileContent(cacheKey, vector),
      'utf-8',
    )

    const generate = vi.fn()
    const result = await getOrCreateEmbedding(
      'post',
      cacheKey,
      generate,
      tmpDir,
    )

    expect(result).toEqual(vector)
    expect(generate).not.toHaveBeenCalled()
  })

  it('calls generate and writes cache on cache miss', async () => {
    const vector = makeVector()
    const generate = vi.fn().mockResolvedValueOnce(vector)

    const result = await getOrCreateEmbedding(
      'new-post',
      'voyage-4:xyz',
      generate,
      tmpDir,
    )

    expect(result).toEqual(vector)
    expect(generate).toHaveBeenCalledOnce()

    const content = await readFile(path.join(tmpDir, 'new-post.vec'), 'utf-8')
    expect(content).toBe(makeCacheFileContent('voyage-4:xyz', vector))
  })

  it('bypasses cache when FORCE_REGENERATE_EMBEDDINGS is true', async () => {
    process.env.FORCE_REGENERATE_EMBEDDINGS = 'true'

    // Write a valid cache file that should be bypassed
    const oldVector = makeVector()
    const cacheKey = 'voyage-4:abc'
    await writeFile(
      path.join(tmpDir, 'post.vec'),
      makeCacheFileContent(cacheKey, oldVector),
      'utf-8',
    )

    const newVector = Array.from({ length: 1024 }, () => 0.5)
    const generate = vi.fn().mockResolvedValueOnce(newVector)

    const result = await getOrCreateEmbedding(
      'post',
      cacheKey,
      generate,
      tmpDir,
    )

    expect(result).toEqual(newVector)
    expect(generate).toHaveBeenCalledOnce()
  })

  it('does not bypass cache when FORCE_REGENERATE_EMBEDDINGS is not "true"', async () => {
    process.env.FORCE_REGENERATE_EMBEDDINGS = 'false'

    const vector = makeVector()
    const cacheKey = 'voyage-4:abc'
    await writeFile(
      path.join(tmpDir, 'post.vec'),
      makeCacheFileContent(cacheKey, vector),
      'utf-8',
    )

    const generate = vi.fn()
    const result = await getOrCreateEmbedding(
      'post',
      cacheKey,
      generate,
      tmpDir,
    )

    expect(result).toEqual(vector)
    expect(generate).not.toHaveBeenCalled()
  })

  it('calls generate when cached file is corrupted', async () => {
    // Write a corrupted file (wrong number of lines)
    await writeFile(
      path.join(tmpDir, 'corrupted.vec'),
      'voyage-4:abc\n0.1\n',
      'utf-8',
    )

    const vector = makeVector()
    const generate = vi.fn().mockResolvedValueOnce(vector)

    const result = await getOrCreateEmbedding(
      'corrupted',
      'voyage-4:abc',
      generate,
      tmpDir,
    )

    expect(result).toEqual(vector)
    expect(generate).toHaveBeenCalledOnce()
    // Corrupted file should be replaced with valid data
    const content = await readFile(path.join(tmpDir, 'corrupted.vec'), 'utf-8')
    expect(content).toBe(makeCacheFileContent('voyage-4:abc', vector))
  })
})
