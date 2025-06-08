import { describe, expect, it, vi } from 'vitest'

// Mock only contentlayer/generated
vi.mock('contentlayer/generated', () => ({
  allPosts: [],
}))

// Import metadata from the page
const { metadata } = await import('../page')

describe('Blog Page', () => {
  describe('metadata', () => {
    it('should have the correct title', () => {
      expect(metadata.title).toBe('Fohte Blog')
    })
  })
})
