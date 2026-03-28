import fs from 'node:fs'
import path from 'node:path'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import embeds from 'astro-embed/integration'
import matter from 'gray-matter'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

/**
 * Build a map from blog post URL path to lastmod date by reading frontmatter
 * from content files. Uses updatedDate if present, otherwise falls back to date.
 */
function buildPostLastmodMap() {
  const postsDir = path.resolve('./src/content/posts')
  /** @type {Map<string, Date>} */
  const map = new Map()

  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith('.mdx')) continue

    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
    const { data: frontmatter } = matter(content)
    const lastmodDate = frontmatter.updatedDate ?? frontmatter.date
    if (!lastmodDate) continue

    const slug = file.replace(/\.mdx$/, '')
    map.set(`/blog/posts/${slug}`, new Date(lastmodDate))
  }

  return map
}

const postLastmodMap = buildPostLastmodMap()

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
      serialize(item) {
        const url = new URL(item.url)
        const lastmod = postLastmodMap.get(url.pathname)
        if (lastmod) {
          item.lastmod = lastmod.toISOString()
        }
        return item
      },
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
