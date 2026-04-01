import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const EXPECTED_DIMENSIONS = 1024

export const DEFAULT_EMBEDDINGS_DIR = path.resolve('src/data/embeddings')

/**
 * Read a cached embedding vector from a .vec file.
 *
 * Returns the vector if the cache key matches, or `null` on cache miss,
 * missing file, or corrupted data. Corrupted files are deleted automatically.
 */
export async function readEmbeddingCache(
  slug: string,
  expectedCacheKey: string,
  embeddingsDir: string = DEFAULT_EMBEDDINGS_DIR,
): Promise<number[] | null> {
  const filePath = path.join(embeddingsDir, `${slug}.vec`)

  let content: string
  try {
    content = await readFile(filePath, 'utf-8')
  } catch {
    return null
  }

  const lines = content.split('\n').filter((line) => line !== '')

  // Validate structure: 1 cache key line + EXPECTED_DIMENSIONS float lines
  if (lines.length !== EXPECTED_DIMENSIONS + 1) {
    console.warn(
      `[embedding-cache] Corrupted cache file for "${slug}" (expected ${String(EXPECTED_DIMENSIONS + 1)} lines, got ${String(lines.length)}). Deleting.`,
    )
    await rm(filePath, { force: true })
    return null
  }

  const cacheKey = lines[0]

  // Cache key mismatch — content or model changed
  if (cacheKey !== expectedCacheKey) {
    return null
  }

  const vector: number[] = []
  for (let i = 1; i < lines.length; i++) {
    const value = Number(lines[i])
    if (!Number.isFinite(value)) {
      console.warn(
        `[embedding-cache] Corrupted cache file for "${slug}" (non-numeric value at line ${String(i + 1)}). Deleting.`,
      )
      await rm(filePath, { force: true })
      return null
    }
    vector.push(value)
  }

  return vector
}

/**
 * Write an embedding vector to a .vec cache file.
 *
 * Format: first line is the cache key, followed by one float per line.
 */
export async function writeEmbeddingCache(
  slug: string,
  cacheKey: string,
  vector: number[],
  embeddingsDir: string = DEFAULT_EMBEDDINGS_DIR,
): Promise<void> {
  await mkdir(embeddingsDir, { recursive: true })

  const filePath = path.join(embeddingsDir, `${slug}.vec`)
  const lines = [cacheKey, ...vector.map(String)]
  await writeFile(filePath, lines.join('\n') + '\n', 'utf-8')
}

/**
 * Get an embedding vector for a post, using the .vec file cache when possible.
 *
 * Cache logic:
 * 1. If `FORCE_REGENERATE_EMBEDDINGS=true`, skip cache and call `generate`.
 * 2. Try reading the cache file; if hit, return the cached vector.
 * 3. On miss, call `generate` to obtain the vector, write it to cache, and return.
 */
export async function getOrCreateEmbedding(
  slug: string,
  cacheKey: string,
  generate: () => Promise<number[]>,
  embeddingsDir: string = DEFAULT_EMBEDDINGS_DIR,
): Promise<number[]> {
  const forceRegenerate = process.env.FORCE_REGENERATE_EMBEDDINGS === 'true'

  if (!forceRegenerate) {
    const cached = await readEmbeddingCache(slug, cacheKey, embeddingsDir)
    if (cached != null) {
      return cached
    }
  }

  const vector = await generate()
  await writeEmbeddingCache(slug, cacheKey, vector, embeddingsDir)
  return vector
}
