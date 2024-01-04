import { defineDocumentType, makeSource } from 'contentlayer/source-files'

// contentlayer.config.ts does not support tsconfig paths
// see: https://github.com/contentlayerdev/contentlayer/issues/238
// eslint-disable-next-line no-restricted-imports
import { remarkPlugins } from './src/utils/mdx/config'

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
    remarkPlugins,
  },
})
