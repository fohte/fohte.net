import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

export const remarkPlugins = [
  // enable GitHub Flavored Markdown
  remarkGfm,

  // enable GitHub-like line breaks
  remarkBreaks,

  // prevent <img> and <figure> tags from being wrapped in <p> tags
  // to avoid invalid HTML and hydration errors
  remarkUnwrapImages,
]
