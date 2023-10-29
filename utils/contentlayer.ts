import { pick } from 'remeda'
import { type Post } from 'contentlayer/generated'

export type PostFrontmatter = Pick<
  Post,
  'title' | 'date' | 'tags' | 'description' | 'imagePath'
>

export const findPostFrontmatter = (post: Post): PostFrontmatter =>
  pick(post, ['title', 'date', 'tags', 'description', 'imagePath'])
