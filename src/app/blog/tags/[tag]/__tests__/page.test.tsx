import { describe, expect, it, vi } from 'vitest'

// Mock contentlayer/generated
vi.mock('contentlayer/generated', () => ({
  allPosts: [],
}))

// Mock components that might have their own dependencies
vi.mock('@/components/Container', () => ({
  Container: () => null,
}))

vi.mock('@/components/PostList', () => ({
  PostList: () => null,
}))

vi.mock('@/utils/contentlayer', () => ({
  findPostFrontmatter: vi.fn(),
}))

// Now we can safely import the generateMetadata function
const { generateMetadata } = await import('../page')

describe('Tag Page', () => {
  describe('generateMetadata', () => {
    it('should generate correct title for a tag', async () => {
      const metadata = await generateMetadata({
        params: { tag: 'react' },
      })

      expect(metadata.title).toBe('#react - Fohte Blog')
    })

    it('should handle tags with special characters', async () => {
      const metadata = await generateMetadata({
        params: { tag: 'next.js' },
      })

      expect(metadata.title).toBe('#next.js - Fohte Blog')
    })

    it('should handle Japanese tags', async () => {
      const metadata = await generateMetadata({
        params: { tag: '技術' },
      })

      expect(metadata.title).toBe('#技術 - Fohte Blog')
    })
  })
})
