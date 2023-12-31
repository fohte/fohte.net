import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: false },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    imagePath: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/posts/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'src/contents/posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      // enable GitHub Flavored Markdown
      remarkGfm,

      // enable GitHub-like line breaks
      remarkBreaks,

      // prevent <img> and <figure> tags from being wrapped in <p> tags
      // to avoid invalid HTML and hydration errors
      remarkUnwrapImages,
    ],
  },
})
