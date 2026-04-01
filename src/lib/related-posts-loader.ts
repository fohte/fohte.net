import { readdir } from 'node:fs/promises'
import path from 'node:path'

import type { Loader } from 'astro/loaders'
import { z } from 'astro/zod'

import { getOrCreateEmbedding } from '@/lib/embedding-cache'
import { EMBEDDING_MODEL } from '@/lib/embedding-constants'
import {
  computeContentHash,
  extractTextFromFile,
} from '@/lib/mdx-text-extractor'
import { findRelatedPosts, type PostEmbedding } from '@/lib/related-posts'

export interface RelatedPostsLoaderOptions {
  maxRelatedPosts?: number
  postsDir?: string
  embeddingsDir?: string
}

export const relatedPostsSchema = z.object({
  slug: z.string(),
  relatedSlugs: z.array(
    z.object({
      slug: z.string(),
      score: z.number(),
    }),
  ),
})

export function relatedPostsLoader(
  options?: RelatedPostsLoaderOptions,
): Loader {
  const maxRelatedPosts = options?.maxRelatedPosts ?? 5
  const postsDir = options?.postsDir ?? './src/content/posts'
  const embeddingsDir = options?.embeddingsDir

  return {
    name: 'related-posts-loader',
    load: async (context) => {
      const { store, logger } = context
      const startTime = performance.now()

      // Read MDX files directly from filesystem (loader execution order is not guaranteed)
      const resolvedPostsDir = path.resolve(postsDir)
      const files = await readdir(resolvedPostsDir)
      const mdxFiles = files.filter((f) => f.endsWith('.mdx'))

      logger.info(`Found ${String(mdxFiles.length)} MDX files`)

      // Extract text and compute embeddings for each post
      const postEmbeddings: PostEmbedding[] = []
      let cacheHits = 0
      let apiCalls = 0
      let skippedPosts = 0

      for (const file of mdxFiles) {
        const slug = path.basename(file, '.mdx')
        const filePath = path.join(resolvedPostsDir, file)

        const extracted = await extractTextFromFile(filePath)
        const text = `${extracted.title}\n\n${extracted.body}`
        const cacheKey = computeContentHash(text, EMBEDDING_MODEL)

        // Track whether generate callback was invoked (cache miss)
        const callTracker = { called: false }
        let vector: number[]
        try {
          vector = await getOrCreateEmbedding(
            slug,
            cacheKey,
            async () => {
              callTracker.called = true
              // Dynamic import to avoid voyageai SDK resolution at astro sync time
              const { generateEmbedding } =
                await import('@/lib/voyage-embeddings')
              const result = await generateEmbedding(text)
              if (result == null) {
                throw new Error(
                  `Failed to generate embedding for "${slug}": API key not configured`,
                )
              }
              return result.vector
            },
            embeddingsDir,
          )
        } catch (error) {
          // Graceful degradation: skip posts that fail embedding generation
          logger.warn(
            `Skipping "${slug}": ${error instanceof Error ? error.message : String(error)}`,
          )
          skippedPosts++
          continue
        }

        if (callTracker.called) {
          apiCalls++
        } else {
          cacheHits++
        }

        postEmbeddings.push({ slug, vector })
      }

      // Compute related posts via cosine similarity
      const relatedPostsMap = findRelatedPosts(postEmbeddings, maxRelatedPosts)

      // Store results in Content Store
      store.clear()
      for (const [slug, relatedSlugs] of Object.entries(relatedPostsMap)) {
        const rawData = { slug, relatedSlugs }
        const data = await context.parseData({ id: slug, data: rawData })
        const digest = context.generateDigest(data)
        store.set({ id: slug, data, digest })
      }

      const elapsed = performance.now() - startTime
      const parts = [
        `${String(postEmbeddings.length)} posts processed`,
        `${String(cacheHits)} cache hits`,
        `${String(apiCalls)} API calls`,
      ]
      if (skippedPosts > 0) {
        parts.push(`${String(skippedPosts)} skipped`)
      }
      logger.info(
        `Completed in ${String(Math.round(elapsed))}ms: ${parts.join(', ')}`,
      )
    },
    schema: relatedPostsSchema,
  }
}
