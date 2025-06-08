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

// Now we can safely import the metadata
const { metadata } = await import('../page')

describe('Blog Page', () => {
  describe('metadata', () => {
    it('should have the correct title', () => {
      expect(metadata.title).toBe('Fohte Blog')
    })
  })
})
