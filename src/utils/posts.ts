import {
  type CollectionEntry,
  getCollection,
  getEntry,
  render,
} from 'astro:content'

export type Post = CollectionEntry<'posts'>

/**
 * Get all posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts')
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

/**
 * Get a single post by its slug (id)
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return getEntry('posts', slug)
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.tags?.includes(tag))
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getCollection('posts')
  const tagsSet = new Set<string>()
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      tagsSet.add(tag)
    }
  }
  return Array.from(tagsSet).sort()
}

/**
 * Render a post's content to HTML
 */
export async function renderPost(post: Post) {
  return render(post)
}

/**
 * Generate URL path for a post
 */
export function getPostUrl(post: Post): string {
  return `/blog/posts/${post.id}`
}
