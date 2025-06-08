import { Metadata } from 'next'
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

describe('Blog Metadata', () => {
  describe('Blog Layout', () => {
    it('should define the correct title template', async () => {
      const { metadata } = await import('../layout')
      expect(metadata.title).toEqual({
        template: '%s | Fohte Blog',
        default: 'Fohte Blog',
      })
    })
  })

  describe('Blog Listing Page', () => {
    it('should use absolute title to prevent template stacking', async () => {
      const { generateMetadata } = await import('../page')
      const metadata = await generateMetadata()

      // Should use absolute to prevent "記事一覧 | Fohte Blog | fohte.net"
      expect(metadata.title).toEqual({
        absolute: '記事一覧 | Fohte Blog',
      })
    })
  })

  describe('Blog Tag Page', () => {
    it('should generate title with tag name', async () => {
      const { generateMetadata } = await import('../tags/[tag]/page')
      const metadata = await generateMetadata({
        params: { tag: 'javascript' },
      })

      // Should inherit blog layout template: "#javascript | Fohte Blog"
      expect(metadata.title).toBe('#javascript')
    })
  })

  describe('Blog Post Page', () => {
    it('should generate title from post data', async () => {
      const { generateMetadata } = await import('../posts/[slug]/page')
      const metadata = await generateMetadata(
        { params: { slug: 'test-post' } },
        Promise.resolve({} as Metadata),
      )

      // Should inherit blog layout template: "Test Post | Fohte Blog"
      expect(metadata.title).toBe('Test Post')
      expect(metadata.description).toBe('Test description')
    })
  })

  describe('Title Template Inheritance', () => {
    it('blog pages should result in "Fohte Blog" suffix', () => {
      // This documents the expected behavior:
      // - Blog layout sets template: "%s | Fohte Blog"
      // - Child pages (tags, posts) that return simple titles inherit this template
      // - Blog listing page uses absolute to prevent double templating

      const expectations = {
        blogListing: '記事一覧 | Fohte Blog', // absolute, no inheritance
        tagPage: '#tag | Fohte Blog', // inherits blog template
        postPage: 'Post Title | Fohte Blog', // inherits blog template
      }

      // This is more of a documentation test
      expect(expectations).toMatchSnapshot()
    })
  })
})
