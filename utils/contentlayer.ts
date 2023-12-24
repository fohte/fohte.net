import { type Post } from 'contentlayer/generated'
import { pick } from 'remeda'

export type PostFrontmatter = Pick<
  Post,
  'title' | 'date' | 'tags' | 'description' | 'imagePath'
>

export const findPostFrontmatter = (post: Post): PostFrontmatter =>
  pick(post, ['title', 'date', 'tags', 'description', 'imagePath'])
