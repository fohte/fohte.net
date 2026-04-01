import { readdir } from 'node:fs/promises'
import path from 'node:path'

import {
  DEFAULT_EMBEDDINGS_DIR,
  readEmbeddingCache,
  writeEmbeddingCache,
} from '@/lib/embedding-cache'
import {
  computeContentHash,
  extractTextFromFile,
} from '@/lib/mdx-text-extractor'
import { generateEmbeddings } from '@/lib/voyage-embeddings'

const POSTS_DIR = path.resolve('src/content/posts')

// Process posts in batches to stay within Voyage AI rate limits.
// Free tier: 3 RPM, 10K TPM. Use 1 batch per minute window to ensure
// the RPM counter fully resets (including SDK retry attempts).
const BATCH_SIZE = 3
const BATCH_DELAY_MS = 61_000

interface PostEntry {
  slug: string
  text: string
  cacheKey: string
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main(): Promise<void> {
  const apiKey = process.env.VOYAGE_API_KEY
  if (apiKey == null || apiKey === '') {
    throw new Error(
      '[generate-embeddings] VOYAGE_API_KEY is not set. Set it as an environment variable.',
    )
  }

  const files = await readdir(POSTS_DIR)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'))

  console.log(`[generate-embeddings] Found ${String(mdxFiles.length)} posts`)

  // Determine which posts need embedding generation
  const needsGeneration: PostEntry[] = []
  let cached = 0

  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, '')
    const filePath = path.join(POSTS_DIR, file)

    const { title, body } = await extractTextFromFile(filePath)
    const text = `${title}\n\n${body}`
    const cacheKey = computeContentHash(text)

    const existingCache = await readEmbeddingCache(
      slug,
      cacheKey,
      DEFAULT_EMBEDDINGS_DIR,
    )
    if (existingCache != null) {
      cached++
      continue
    }

    needsGeneration.push({ slug, text, cacheKey })
  }

  if (needsGeneration.length === 0) {
    console.log(
      `[generate-embeddings] Done: 0 generated, ${String(cached)} cached`,
    )
    return
  }

  // Process in batches
  let generated = 0
  let totalTokens = 0

  for (let i = 0; i < needsGeneration.length; i += BATCH_SIZE) {
    if (i > 0) {
      console.log(
        `[generate-embeddings] Waiting ${String(BATCH_DELAY_MS / 1000)}s for rate limit...`,
      )
      await sleep(BATCH_DELAY_MS)
    }

    const batch = needsGeneration.slice(i, i + BATCH_SIZE)
    const texts = batch.map((entry) => entry.text)

    console.log(
      `[generate-embeddings] Processing batch ${String(Math.floor(i / BATCH_SIZE) + 1)} (${String(batch.length)} posts)`,
    )

    const result = await generateEmbeddings(texts)

    if (result == null) {
      throw new Error('[generate-embeddings] API returned null unexpectedly.')
    }

    totalTokens += result.totalTokens

    for (let j = 0; j < batch.length; j++) {
      const entry = batch[j]
      await writeEmbeddingCache(
        entry.slug,
        entry.cacheKey,
        result.embeddings[j],
        DEFAULT_EMBEDDINGS_DIR,
      )
      console.log(
        `[generate-embeddings] Generated embedding for "${entry.slug}"`,
      )
    }

    generated += batch.length
  }

  console.log(
    `[generate-embeddings] Done: ${String(generated)} generated, ${String(cached)} cached (${String(totalTokens)} total tokens)`,
  )
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
