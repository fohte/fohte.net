import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import embeds from 'astro-embed/integration'
import icon from 'astro-icon'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

export default defineConfig({
  integrations: [
    react(),
    embeds({
      services: {
        LinkPreview: false,
      },
    }),
    mdx(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [remarkGfm, remarkBreaks, remarkUnwrapImages],
    syntaxHighlight: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
