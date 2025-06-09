import type { Metadata } from 'next'
import { describe, expect, it, vi } from 'vitest'

// Mock contentlayer
vi.mock('contentlayer/generated', () => ({
  allPosts: [
    {
      _raw: { flattenedPath: 'test-post' },
      title: 'Test Post',
      description: 'Test description',
      tags: ['test'],
    },
  ],
}))

describe('Blog Metadata Integration Tests', () => {
  describe('Layout Metadata', () => {
    it('root layout should define base metadata', async () => {
      const { metadata } = await import('../../layout')

      expect(metadata.title).toEqual({
        template: '%s | fohte.net',
        default: 'fohte.net',
      })
      expect(metadata.openGraph?.siteName).toBe('fohte.net')
      expect(metadata.twitter?.site).toBe('@fohte')
    })

    it('blog layout should override title template', async () => {
      const { metadata } = await import('../layout')

      expect(metadata.title).toEqual({
        template: '%s | Fohte Blog',
        default: 'Fohte Blog',
      })
    })
  })

  describe('Page Metadata Generation', () => {
    it('blog listing page should use absolute title', async () => {
      const { generateMetadata } = await import('../page')
      const metadata = await generateMetadata()

      // Uses absolute to prevent "記事一覧 | Fohte Blog | fohte.net"
      expect(metadata.title).toEqual({
        absolute: '記事一覧 | Fohte Blog',
      })
    })

    it('tag page should return simple title for template inheritance', async () => {
      const { generateMetadata } = await import('../tags/[tag]/page')
      const metadata = await generateMetadata({
        params: { tag: 'react' },
      })

      // Returns simple title, blog layout template will be applied
      expect(metadata.title).toBe('#react')
    })

    it('post page should return post title and metadata', async () => {
      const { generateMetadata } = await import('../posts/[slug]/page')
      const parentMetadata: Metadata = {
        openGraph: {
          images: [{ url: '/default.png' }],
        },
      }

      const metadata = await generateMetadata(
        { params: { slug: 'test-post' } },
        Promise.resolve(parentMetadata),
      )

      expect(metadata.title).toBe('Test Post')
      expect(metadata.description).toBe('Test description')
      expect(metadata.openGraph?.type).toBe('article')
    })
  })

  describe('Title Resolution Examples', () => {
    it('documents expected title resolution', () => {
      // This documents how Next.js resolves titles with templates
      const examples = [
        {
          page: '/',
          pageTitle: undefined,
          layoutTemplate: '%s | fohte.net',
          result: 'fohte.net',
        },
        {
          page: '/blog',
          pageTitle: { absolute: '記事一覧 | Fohte Blog' },
          layoutTemplate: '%s | Fohte Blog',
          result: '記事一覧 | Fohte Blog',
        },
        {
          page: '/blog/tags/react',
          pageTitle: '#react',
          layoutTemplate: '%s | Fohte Blog',
          result: '#react | Fohte Blog',
        },
        {
          page: '/blog/posts/hello',
          pageTitle: 'Hello World',
          layoutTemplate: '%s | Fohte Blog',
          result: 'Hello World | Fohte Blog',
        },
      ]

      examples.forEach((example) => {
        expect(example).toHaveProperty('result')
      })
    })
  })
})
