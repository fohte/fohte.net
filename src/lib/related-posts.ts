/**
 * Compute cosine similarity between two vectors of equal length.
 *
 * Returns 0 when either vector is a zero vector (all components are 0)
 * to avoid division by zero.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(
      `Vectors must have the same length (got ${String(a.length)} and ${String(b.length)})`,
    )
  }

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

function computeNorm(vector: number[]): number {
  let sum = 0
  for (const v of vector) {
    sum += v * v
  }
  return Math.sqrt(sum)
}

function dotProduct(a: number[], b: number[]): number {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i]
  }
  return sum
}

/**
 * Find the top-N most similar posts for each post based on cosine similarity.
 *
 * Each post is excluded from its own related list. Results are sorted by
 * descending similarity score. Norms are pre-computed to avoid redundant
 * calculations across pairs.
 */
export function findRelatedPosts(
  posts: PostEmbedding[],
  maxRelatedPosts: number = 5,
): Record<string, ScoredSlug[]> {
  const result: Record<string, ScoredSlug[]> = {}

  // Pre-compute norms to avoid recalculating for each pair
  const norms = new Map<string, number>()
  for (const post of posts) {
    norms.set(post.slug, computeNorm(post.vector))
  }

  for (const post of posts) {
    const scores: ScoredSlug[] = []
    const normA = norms.get(post.slug) ?? 0

    for (const other of posts) {
      if (other.slug === post.slug) {
        continue
      }

      const normB = norms.get(other.slug) ?? 0

      let score: number
      if (normA === 0 || normB === 0) {
        score = 0
      } else {
        score = dotProduct(post.vector, other.vector) / (normA * normB)
      }

      scores.push({ slug: other.slug, score })
    }

    scores.sort((a, b) => b.score - a.score)

    result[post.slug] = scores.slice(0, maxRelatedPosts)
  }

  return result
}
