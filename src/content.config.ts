import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

import { relatedPostsLoader } from '#lib/related-posts-loader'

const isVrt = process.env.VRT === 'true'
const postsBase = isVrt ? './src/content/vrt-posts' : './src/content/posts'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: postsBase }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    imagePath: z.string().optional(),
  }),
})

const relatedPosts = defineCollection({
  loader: relatedPostsLoader({
    postsDir: postsBase,
    embeddingsDir: isVrt ? './.vrt/embeddings' : undefined,
  }),
  schema: z.object({
    slug: z.string(),
    relatedSlugs: z.array(
      z.object({
        slug: z.string(),
        score: z.number(),
      }),
    ),
  }),
})

export const collections = { posts, relatedPosts }
