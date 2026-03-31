import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

import matter from 'gray-matter'

/**
 * MDX file content parsed into title and plain text body.
 */
export interface ExtractedText {
  title: string
  body: string
}

/**
 * Strip Markdown / MDX syntax to produce plain text.
 *
 * Handles: headings, bold/italic, links, images, inline code, code blocks,
 * HTML/JSX tags, footnote references, and footnote definitions.
 */
export function stripMarkdown(md: string): string {
  return (
    md
      // Remove fenced code blocks (``` ... ```)
      .replace(/^```[\s\S]*?^```/gm, '')
      // Remove inline code
      .replace(/`[^`]+`/g, '')
      // Remove images ![alt](url)
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      // Convert links [text](url) to text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      // Remove HTML/JSX tags (including self-closing like <CardLink ... />)
      .replace(/<[^>]+\/?>/g, '')
      // Remove heading markers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic markers
      .replace(/(\*{1,3}|_{1,3})([^*_]+)\1/g, '$2')
      // Remove footnote references [^name]
      .replace(/\[\^[^\]]+\]/g, '')
      // Remove footnote definitions at line start
      .replace(/^\[\^[^\]]+\]:\s*/gm, '')
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, '')
      // Collapse multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

/**
 * Parse an MDX string and extract the title (from frontmatter) and
 * the body as plain text (Markdown syntax stripped).
 */
export function extractTextFromMdx(mdxContent: string): ExtractedText {
  const { data, content } = matter(mdxContent)
  const title = typeof data.title === 'string' ? data.title : ''
  const body = stripMarkdown(content)
  return { title, body }
}

/**
 * Read an MDX file from disk and extract its text content.
 */
export async function extractTextFromFile(
  filePath: string,
): Promise<ExtractedText> {
  const raw = await readFile(filePath, 'utf-8')
  return extractTextFromMdx(raw)
}

/**
 * Compute a cache key combining the embedding model name and a SHA-256 hash
 * of the content text.
 *
 * Format: `<model>:<sha256hex>`
 */
export function computeContentHash(
  text: string,
  model: string = 'voyage-4',
): string {
  const hash = createHash('sha256').update(text, 'utf-8').digest('hex')
  return `${model}:${hash}`
}
