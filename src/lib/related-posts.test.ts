import { describe, expect, it } from 'vitest'

import {
  cosineSimilarity,
  findRelatedPosts,
  type PostEmbedding,
} from '@/lib/related-posts'

describe('cosineSimilarity', () => {
  it('returns 1 for identical unit vectors', () => {
    const v = [1, 0, 0]
    expect(cosineSimilarity(v, v)).toBeCloseTo(1)
  })

  it('returns 0 for orthogonal vectors', () => {
    const a = [1, 0, 0]
    const b = [0, 1, 0]
    expect(cosineSimilarity(a, b)).toBeCloseTo(0)
  })

  it('returns 0 when either vector is a zero vector', () => {
    const zero = [0, 0, 0]
    const v = [1, 2, 3]

    expect(cosineSimilarity(zero, v)).toBe(0)
    expect(cosineSimilarity(v, zero)).toBe(0)
  })

  it('returns -1 for opposite vectors', () => {
    const a = [1, 0]
    const b = [-1, 0]
    expect(cosineSimilarity(a, b)).toBeCloseTo(-1)
  })

  it('computes a known similarity value', () => {
    // cos([1,2,3], [4,5,6]) = 32 / (sqrt(14) * sqrt(77)) ≈ 0.9746
    const a = [1, 2, 3]
    const b = [4, 5, 6]
    const expected = 32 / (Math.sqrt(14) * Math.sqrt(77))
    expect(cosineSimilarity(a, b)).toBeCloseTo(expected)
  })

  it('is invariant to vector magnitude', () => {
    const a = [1, 2, 3]
    const b = [2, 4, 6]
    expect(cosineSimilarity(a, b)).toBeCloseTo(1)
  })
})

describe('findRelatedPosts', () => {
  function makePost(slug: string, vector: number[]): PostEmbedding {
    return { slug, vector }
  }

  it('excludes the post itself from its related posts', () => {
    const posts = [makePost('a', [1, 0]), makePost('b', [1, 0])]

    const result = findRelatedPosts(posts)

    expect(result.a.every((r) => r.slug !== 'a')).toBe(true)
  })

  it('returns posts sorted by descending similarity', () => {
    const posts = [
      makePost('target', [1, 0, 0]),
      makePost('closest', [0.9, 0.1, 0]),
      makePost('mid', [0.5, 0.5, 0]),
      makePost('far', [0, 0, 1]),
    ]

    const result = findRelatedPosts(posts)

    expect(result.target.map((r) => r.slug)).toEqual(['closest', 'mid', 'far'])
    expect(result.target[0].score).toBeGreaterThan(result.target[1].score)
    expect(result.target[1].score).toBeGreaterThan(result.target[2].score)
  })

  it('limits results to maxRelatedPosts', () => {
    const posts = [
      makePost('target', [1, 0]),
      makePost('a', [0.9, 0.1]),
      makePost('b', [0.8, 0.2]),
      makePost('c', [0.7, 0.3]),
      makePost('d', [0.6, 0.4]),
    ]

    const result = findRelatedPosts(posts, 2)

    expect(result.target).toHaveLength(2)
    expect(result.target[0].slug).toBe('a')
    expect(result.target[1].slug).toBe('b')
  })

  it('returns an empty object for empty input', () => {
    const result = findRelatedPosts([])
    expect(Object.keys(result)).toHaveLength(0)
  })

  it('returns an empty related list for a single post', () => {
    const posts = [makePost('only', [1, 0])]
    const result = findRelatedPosts(posts)
    expect(result.only).toEqual([])
  })
})
