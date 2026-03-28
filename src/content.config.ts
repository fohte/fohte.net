import { defineCollection } from 'astro/content/config'
import { glob } from 'astro/loaders'
import { z } from 'zod'

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

export const collections = { posts }
