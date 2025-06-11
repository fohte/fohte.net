import { describe, expect, it, vi } from 'vitest'

// Mock only contentlayer/generated
vi.mock('contentlayer/generated', () => ({
  allPosts: [],
}))

// Import generateMetadata from the page
const { generateMetadata } = await import('../page')

describe('Blog Page', () => {
  describe('generateMetadata', () => {
    it('should have the correct title', async () => {
      const metadata = await generateMetadata()
      expect(metadata.title).toEqual({
        absolute: '記事一覧 | Fohte Blog',
      })
    })
  })
})
