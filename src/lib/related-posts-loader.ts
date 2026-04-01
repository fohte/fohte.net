import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import type { Loader } from 'astro/loaders'
import { z } from 'astro/zod'

import { getOrCreateEmbedding } from '@/lib/embedding-cache'
import { EMBEDDING_MODEL } from '@/lib/embedding-constants'
import {
  computeContentHash,
  extractTextFromFile,
} from '@/lib/mdx-text-extractor'
import {
  findRelatedPosts,
  type PostEmbedding,
  type ScoredSlug,
} from '@/lib/related-posts'

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

export interface LoadResult {
  relatedPostsMap: Record<string, ScoredSlug[]>
  totalPosts: number
  cacheHits: number
  apiCalls: number
  skippedPosts: number
  elapsedMs: number
}

export interface Logger {
  info: (message: string) => void
  warn: (message: string) => void
}

/**
 * Core logic for loading related posts data.
 * Extracted from the Astro loader for testability.
 */
export async function loadRelatedPosts(
  options: {
    postsDir: string
    embeddingsDir?: string
    maxRelatedPosts: number
  },
  logger: Logger,
): Promise<LoadResult> {
  const startTime = performance.now()

  // Read MDX files from filesystem (loader execution order is not guaranteed)
  // Only flat directory structure is supported — subdirectories require
  // embedding cache changes to handle slugs with path separators.
  const resolvedPostsDir = path.resolve(options.postsDir)
  const entries = await readdir(resolvedPostsDir)

  // Fail loudly if subdirectories contain MDX files, so the developer
  // knows to extend the loader and embedding cache for nested paths.
  for (const entry of entries) {
    const entryPath = path.join(resolvedPostsDir, entry)
    const entryStat = await stat(entryPath)
    if (entryStat.isDirectory()) {
      const subFiles = await readdir(entryPath)
      const hasMdx = subFiles.some((f) => f.endsWith('.mdx'))
      if (hasMdx) {
        throw new Error(
          `MDX files found in subdirectory "${entry}" of postsDir. ` +
            'The related posts loader only supports a flat directory structure. ' +
            'To add subdirectory support, update the loader and embedding cache module.',
        )
      }
    }
  }

  const mdxFiles = entries.filter((f) => f.endsWith('.mdx'))

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
          const { generateEmbedding } = await import('@/lib/voyage-embeddings')
          const result = await generateEmbedding(text)
          if (result == null) {
            throw new Error(
              `Failed to generate embedding for "${slug}": API key not configured`,
            )
          }
          return result.vector
        },
        options.embeddingsDir,
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
  const relatedPostsMap = findRelatedPosts(
    postEmbeddings,
    options.maxRelatedPosts,
  )

  const elapsedMs = Math.round(performance.now() - startTime)

  return {
    relatedPostsMap,
    totalPosts: postEmbeddings.length,
    cacheHits,
    apiCalls,
    skippedPosts,
    elapsedMs,
  }
}

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

      const result = await loadRelatedPosts(
        { postsDir, embeddingsDir, maxRelatedPosts },
        logger,
      )

      // Store results in Content Store
      store.clear()
      for (const [slug, relatedSlugs] of Object.entries(
        result.relatedPostsMap,
      )) {
        const rawData = { slug, relatedSlugs }
        const data = await context.parseData({ id: slug, data: rawData })
        const digest = context.generateDigest(data)
        store.set({ id: slug, data, digest })
      }

      const parts = [
        `${String(result.totalPosts)} posts processed`,
        `${String(result.cacheHits)} cache hits`,
        `${String(result.apiCalls)} API calls`,
      ]
      if (result.skippedPosts > 0) {
        parts.push(`${String(result.skippedPosts)} skipped`)
      }
      logger.info(
        `Completed in ${String(result.elapsedMs)}ms: ${parts.join(', ')}`,
      )
    },
    schema: relatedPostsSchema,
  }
}
