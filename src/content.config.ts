import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

import { relatedPostsLoader } from '@/lib/related-posts-loader'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
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
  loader: relatedPostsLoader(),
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
