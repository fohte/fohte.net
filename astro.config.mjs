import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

export default defineConfig({
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkBreaks, remarkUnwrapImages],
      syntaxHighlight: false,
    }),
    icon(),
  ],
  markdown: {
    syntaxHighlight: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
