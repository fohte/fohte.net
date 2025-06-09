import { describe, expect, it } from 'vitest'

/**
 * Utility function to apply Next.js title template
 */
function applyTitleTemplate(
  title: string | { absolute?: string } | undefined,
  template: string | { template?: string; default?: string } | undefined,
): string {
  // If title is absolute, return it as-is
  if (typeof title === 'object' && title?.absolute) {
    return title.absolute
  }

  // If no template, return default or empty string
  if (!template) {
    return (title as string) || ''
  }

  // If template is object with template property
  if (typeof template === 'object' && template.template) {
    // If no title provided, return default
    if (!title) {
      return template.default || ''
    }
    const titleStr = title as string
    return template.template.replace('%s', titleStr)
  }

  // If template is string
  if (typeof template === 'string') {
    return template.replace('%s', (title as string) || '')
  }

  return (title as string) || ''
}

describe('Metadata Title Template Application', () => {
  const rootTemplate = {
    template: '%s | fohte.net',
    default: 'fohte.net',
  }

  const blogTemplate = {
    template: '%s | Fohte Blog',
    default: 'Fohte Blog',
  }

  it('should apply root template correctly', () => {
    expect(applyTitleTemplate('Projects', rootTemplate)).toBe(
      'Projects | fohte.net',
    )
    expect(applyTitleTemplate(undefined, rootTemplate)).toBe('fohte.net')
  })

  it('should apply blog template correctly', () => {
    expect(applyTitleTemplate('#javascript', blogTemplate)).toBe(
      '#javascript | Fohte Blog',
    )
    expect(applyTitleTemplate('Post Title', blogTemplate)).toBe(
      'Post Title | Fohte Blog',
    )
    expect(applyTitleTemplate(undefined, blogTemplate)).toBe('Fohte Blog')
  })

  it('should handle absolute titles', () => {
    const absoluteTitle = { absolute: '記事一覧 | Fohte Blog' }
    expect(applyTitleTemplate(absoluteTitle, blogTemplate)).toBe(
      '記事一覧 | Fohte Blog',
    )
    expect(applyTitleTemplate(absoluteTitle, rootTemplate)).toBe(
      '記事一覧 | Fohte Blog',
    )
  })

  it('should simulate actual page titles', () => {
    // Root pages
    expect(applyTitleTemplate(undefined, rootTemplate)).toBe('fohte.net')

    // Blog listing (uses absolute to prevent double templating)
    expect(
      applyTitleTemplate({ absolute: '記事一覧 | Fohte Blog' }, blogTemplate),
    ).toBe('記事一覧 | Fohte Blog')

    // Blog tag pages (inherit blog template)
    expect(applyTitleTemplate('#javascript', blogTemplate)).toBe(
      '#javascript | Fohte Blog',
    )
    expect(applyTitleTemplate('#技術', blogTemplate)).toBe('#技術 | Fohte Blog')

    // Blog post pages (inherit blog template)
    expect(applyTitleTemplate('My First Post', blogTemplate)).toBe(
      'My First Post | Fohte Blog',
    )
  })
})
