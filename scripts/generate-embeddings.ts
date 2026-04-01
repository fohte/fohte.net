import { readdir } from 'node:fs/promises'
import path from 'node:path'

import {
  DEFAULT_EMBEDDINGS_DIR,
  getOrCreateEmbedding,
  readEmbeddingCache,
} from '@/lib/embedding-cache'
import {
  computeContentHash,
  extractTextFromFile,
} from '@/lib/mdx-text-extractor'
import { generateEmbedding } from '@/lib/voyage-embeddings'

const POSTS_DIR = path.resolve('src/content/posts')

async function main(): Promise<void> {
  const files = await readdir(POSTS_DIR)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'))

  console.log(`[generate-embeddings] Found ${String(mdxFiles.length)} posts`)

  let cached = 0
  let generated = 0
  let skipped = 0

  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, '')
    const filePath = path.join(POSTS_DIR, file)

    const { title, body } = await extractTextFromFile(filePath)
    const text = `${title}\n\n${body}`
    const cacheKey = computeContentHash(text)

    // Check cache first to track stats accurately
    const existingCache = await readEmbeddingCache(
      slug,
      cacheKey,
      DEFAULT_EMBEDDINGS_DIR,
    )
    if (existingCache != null) {
      cached++
      continue
    }

    // Generate embedding via API. If API key is not set, skip.
    const result = await generateEmbedding(text)
    if (result == null) {
      skipped++
      continue
    }

    await getOrCreateEmbedding(slug, cacheKey, () =>
      Promise.resolve(result.vector),
    )
    generated++
    console.log(
      `[generate-embeddings] Generated embedding for "${slug}" (${String(result.totalTokens)} tokens)`,
    )
  }

  console.log(
    `[generate-embeddings] Done: ${String(generated)} generated, ${String(cached)} cached, ${String(skipped)} skipped`,
  )
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
