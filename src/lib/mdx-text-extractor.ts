import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

import matter from 'gray-matter'
import { toString } from 'mdast-util-to-string'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { SKIP, visit } from 'unist-util-visit'

export interface ExtractedText {
  title: string
  body: string
}

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkGfm)

// Node types that don't contribute meaningful text for embedding
const nodeTypesToRemove = new Set([
  'mdxjsEsm', // import/export statements
  'mdxFlowExpression', // {expressions}
  'mdxTextExpression', // inline {expressions}
  'code', // fenced code blocks
  'inlineCode', // inline code
  'image', // images
  'html', // raw HTML
])

/**
 * Parse Markdown/MDX content and extract plain text.
 * JSX components are kept so that text children (e.g. `<Kbd>Ctrl</Kbd>`)
 * are preserved by `toString`. Only non-text nodes like import/export
 * statements, code blocks, and images are removed.
 */
export function stripMarkdown(md: string): string {
  const tree = processor.parse(md)

  visit(tree, (node, index, parent) => {
    if (nodeTypesToRemove.has(node.type)) {
      if (parent && typeof index === 'number') {
        parent.children.splice(index, 1)
        return [SKIP, index]
      }
    }
  })

  // Join top-level blocks with newlines to preserve paragraph separation
  const blocks = 'children' in tree ? (tree.children as unknown[]) : [tree]
  return blocks
    .map((node) => toString(node))
    .filter((text) => text.length > 0)
    .join('\n\n')
    .trim()
}

/**
 * Parse an MDX string and extract the title (from frontmatter) and
 * the body as plain text.
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
