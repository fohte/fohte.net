import { describe, expect, it } from 'vitest'

import {
  computeContentHash,
  extractTextFromMdx,
  stripMarkdown,
} from '@/lib/mdx-text-extractor'

describe('stripMarkdown', () => {
  it('removes heading markers', () => {
    expect(stripMarkdown('## Hello World')).toBe('Hello World')
  })

  it('removes bold and italic markers', () => {
    expect(stripMarkdown('**bold** and *italic*')).toBe('bold and italic')
  })

  it('converts links to plain text', () => {
    expect(stripMarkdown('[click here](https://example.com)')).toBe(
      'click here',
    )
  })

  it('removes images', () => {
    expect(stripMarkdown('![alt text](image.png)')).toBe('')
  })

  it('removes inline code', () => {
    expect(stripMarkdown('use `git push` to deploy')).toBe('use  to deploy')
  })

  it('removes fenced code blocks', () => {
    const input = `before

\`\`\`js
const x = 1
\`\`\`

after`
    expect(stripMarkdown(input)).toBe('beforeafter')
  })

  it('removes self-closing JSX components', () => {
    expect(stripMarkdown('<CardLink href="https://example.com" />')).toBe('')
  })

  it('preserves text children of JSX components', () => {
    expect(stripMarkdown('<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>')).toBe('Ctrl + C')
  })

  it('removes import/export statements', () => {
    const input = `import { Foo } from './foo'

Hello world.`
    expect(stripMarkdown(input)).toBe('Hello world.')
  })

  it('removes footnote references', () => {
    const input = `Some text[^1] here.

[^1]: This is a footnote.`
    expect(stripMarkdown(input)).toBe('Some text here.This is a footnote.')
  })

  it('removes horizontal rules', () => {
    const input = `before\n\n---\n\nafter`
    expect(stripMarkdown(input)).toBe('beforeafter')
  })
})

describe('extractTextFromMdx', () => {
  it('extracts title from frontmatter and strips body', () => {
    const mdx = `---
title: 'My Post Title'
date: '2024-01-01'
tags: [test]
---

## Introduction

This is **bold** text with a [link](https://example.com).
`
    const result = extractTextFromMdx(mdx)
    expect(result.title).toBe('My Post Title')
    expect(result.body).toBe('IntroductionThis is bold text with a link.')
  })

  it('handles MDX without frontmatter title', () => {
    const mdx = `---
date: '2024-01-01'
---

Hello world.
`
    const result = extractTextFromMdx(mdx)
    expect(result.title).toBe('')
    expect(result.body).toBe('Hello world.')
  })

  it('removes all frontmatter fields from body', () => {
    const mdx = `---
title: 'Test'
date: '2024-01-01'
description: 'A description'
tags: [a, b]
imagePath: '/img.png'
---

Body content here.
`
    const result = extractTextFromMdx(mdx)
    expect(result.body).not.toContain('description')
    expect(result.body).not.toContain('imagePath')
    expect(result.body).toBe('Body content here.')
  })

  it('handles Japanese content', () => {
    const mdx = `---
title: 'ブログ始めました'
date: '2024-01-01'
---

これは**テスト**です。
`
    const result = extractTextFromMdx(mdx)
    expect(result.title).toBe('ブログ始めました')
    expect(result.body).toBe('これはテストです。')
  })
})

describe('computeContentHash', () => {
  it('produces a cache key in model:hash format', () => {
    const hash = computeContentHash('hello world')
    expect(hash).toMatch(/^voyage-4:[a-f0-9]{64}$/)
  })

  it('returns the same hash for the same content', () => {
    const a = computeContentHash('identical content')
    const b = computeContentHash('identical content')
    expect(a).toBe(b)
  })

  it('returns different hashes for different content', () => {
    const a = computeContentHash('content A')
    const b = computeContentHash('content B')
    expect(a).not.toBe(b)
  })

  it('uses a custom model name in the cache key', () => {
    const hash = computeContentHash('test', 'voyage-3')
    expect(hash).toMatch(/^voyage-3:[a-f0-9]{64}$/)
  })

  it('changes when model name changes even with same content', () => {
    const a = computeContentHash('same content', 'voyage-4')
    const b = computeContentHash('same content', 'voyage-3')
    expect(a).not.toBe(b)
  })
})
