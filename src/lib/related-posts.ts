/**
 * Compute cosine similarity between two vectors of equal length.
 *
 * Returns 0 when either vector is a zero vector (all components are 0)
 * to avoid division by zero.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  if (normA === 0 || normB === 0) {
    return 0
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

export interface ScoredSlug {
  slug: string
  score: number
}

export interface PostEmbedding {
  slug: string
  vector: number[]
}

/**
 * Find the top-N most similar posts for each post based on cosine similarity.
 *
 * Each post is excluded from its own related list. Results are sorted by
 * descending similarity score.
 */
export function findRelatedPosts(
  posts: PostEmbedding[],
  maxRelatedPosts: number = 5,
): Record<string, ScoredSlug[]> {
  const result: Record<string, ScoredSlug[]> = {}

  for (const post of posts) {
    const scores: ScoredSlug[] = []

    for (const other of posts) {
      if (other.slug === post.slug) {
        continue
      }

      scores.push({
        slug: other.slug,
        score: cosineSimilarity(post.vector, other.vector),
      })
    }

    scores.sort((a, b) => b.score - a.score)

    result[post.slug] = scores.slice(0, maxRelatedPosts)
  }

  return result
}
