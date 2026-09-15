import { type CollectionEntry, getCollection } from 'astro:content'

export type Post = CollectionEntry<'posts'>

/**
 * Get all posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts')
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

/**
 * Generate URL path for a post
 */
export function getPostUrl(post: Post): string {
  return `/blog/posts/${post.id}`
}
