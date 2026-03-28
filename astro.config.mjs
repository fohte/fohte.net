import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import embeds from 'astro-embed/integration'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

/** @returns {import('shiki').ShikiTransformer} */
function transformerStyleCleanup() {
  return {
    name: 'transformer-style-cleanup',
    pre(node) {
      // Remove inline background-color so CSS variables can control it
      if (typeof node.properties.style === 'string') {
        node.properties.style = node.properties.style
          .replace(/background-color:[^;]+;?/, '')
          .trim()
      }
    },
  }
}

/** @returns {import('shiki').ShikiTransformer} */
function transformerFilename() {
  return {
    name: 'transformer-filename',
    root(root) {
      const meta = this.options.meta?.__raw || ''
      const match = meta.match(/filename="([^"]+)"/)
      if (!match) return

      // Wrap the existing root children (the <pre>) in a container div,
      // with a filename badge placed before it.
      const original = [...root.children]
      root.children = [
        {
          type: 'element',
          tagName: 'div',
          properties: { class: 'code-block-wrapper' },
          children: [
            {
              type: 'element',
              tagName: 'div',
              properties: {
                class: 'code-filename',
              },
              children: [{ type: 'text', value: match[1] }],
            },
            ...original,
          ],
        },
      ]
    },
  }
}

export default defineConfig({
  site: 'https://fohte.net',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    react(),
    embeds({
      services: {
        LinkPreview: false,
      },
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/e2e-test-'),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkGfm, remarkBreaks, remarkUnwrapImages],
    shikiConfig: {
      theme: 'one-dark-pro',
      transformers: [transformerStyleCleanup(), transformerFilename()],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
