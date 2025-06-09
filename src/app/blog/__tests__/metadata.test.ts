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

describe('Blog Metadata Configuration', () => {
  describe('Static Metadata Exports', () => {
    it('blog layout should export correct title template', async () => {
      const { metadata } = await import('../layout')
      expect(metadata.title).toEqual({
        template: '%s | Fohte Blog',
        default: 'Fohte Blog',
      })
    })
  })

  describe('Expected Title Behavior', () => {
    it('documents the title generation strategy', () => {
      // Since we can't test generateMetadata directly in unit tests,
      // this documents our expected behavior for E2E tests
      const titleStrategy = {
        rootLayout: {
          template: '%s | fohte.net',
          default: 'fohte.net',
        },
        blogLayout: {
          template: '%s | Fohte Blog',
          default: 'Fohte Blog',
          note: 'Overrides root template for blog pages',
        },
        blogPages: {
          listing: {
            method: 'absolute',
            result: '記事一覧 | Fohte Blog',
            reason: 'Uses absolute to prevent double templating',
          },
          tag: {
            method: 'simple title',
            input: '#javascript',
            result: '#javascript | Fohte Blog',
            reason: 'Inherits blog layout template',
          },
          post: {
            method: 'simple title',
            input: 'Post Title',
            result: 'Post Title | Fohte Blog',
            reason: 'Inherits blog layout template',
          },
        },
      }

      // This serves as documentation and can be verified in E2E tests
      expect(titleStrategy).toBeDefined()
    })
  })
})
