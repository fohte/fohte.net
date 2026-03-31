import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from 'vitest'

import { generateEmbedding, generateEmbeddings } from '@/lib/voyage-embeddings'

// Mock the VoyageAIClient
const mockEmbed = vi.fn()

vi.mock('voyageai', () => {
  return {
    VoyageAIClient: class {
      embed = mockEmbed
    },
  }
})

function makeVector(dimensions: number = 1024): number[] {
  return Array.from({ length: dimensions }, (_, i) => i * 0.001)
}

function makeEmbedResponse(
  vectors: number[][],
  totalTokens: number = 42,
): {
  data: Array<{ object: string; embedding: number[]; index: number }>
  usage: { totalTokens: number }
} {
  return {
    data: vectors.map((embedding, index) => ({
      object: 'embedding',
      embedding,
      index,
    })),
    usage: { totalTokens },
  }
}

describe('generateEmbedding', () => {
  let warnSpy: MockInstance

  beforeEach(() => {
    vi.clearAllMocks()
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('returns an embedding vector on success', async () => {
    const vector = makeVector()
    mockEmbed.mockResolvedValueOnce(makeEmbedResponse([vector], 42))

    const result = await generateEmbedding('hello world', {
      apiKey: 'test-key',
    })

    expect(result).toEqual({
      vector,
      totalTokens: 42,
    })
    expect(mockEmbed).toHaveBeenCalledWith(
      {
        input: 'hello world',
        model: 'voyage-4',
        inputType: 'document',
      },
      { maxRetries: 3 },
    )
  })

  it('returns null and warns when API key is not set', async () => {
    const result = await generateEmbedding('hello world', { apiKey: '' })

    expect(result).toBeNull()
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('VOYAGE_API_KEY is not set'),
    )
    expect(mockEmbed).not.toHaveBeenCalled()
  })

  it('returns null when apiKey option is undefined and env var is unset', async () => {
    const original = process.env.VOYAGE_API_KEY
    delete process.env.VOYAGE_API_KEY

    const result = await generateEmbedding('hello world')

    expect(result).toBeNull()
    expect(warnSpy).toHaveBeenCalled()

    if (original !== undefined) {
      process.env.VOYAGE_API_KEY = original
    }
  })

  it('throws when API response has no embeddings', async () => {
    mockEmbed.mockResolvedValueOnce({ data: [], usage: { totalTokens: 0 } })

    await expect(
      generateEmbedding('hello', { apiKey: 'test-key' }),
    ).rejects.toThrow('did not contain an embedding vector')
  })

  it('throws when dimensions do not match expected value', async () => {
    mockEmbed.mockResolvedValueOnce(makeEmbedResponse([makeVector(512)], 10))

    await expect(
      generateEmbedding('hello', { apiKey: 'test-key' }),
    ).rejects.toThrow('Expected 1024 dimensions but got 512')
  })

  it('passes maxRetries: 3 to the SDK for exponential backoff', async () => {
    mockEmbed.mockResolvedValueOnce(makeEmbedResponse([makeVector()], 10))

    await generateEmbedding('hello', { apiKey: 'test-key' })

    expect(mockEmbed).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({ maxRetries: 3 }),
    )
  })

  it('propagates SDK errors', async () => {
    mockEmbed.mockRejectedValueOnce(new Error('rate limit exceeded'))

    await expect(
      generateEmbedding('hello', { apiKey: 'test-key' }),
    ).rejects.toThrow('rate limit exceeded')
  })
})

describe('generateEmbeddings', () => {
  let warnSpy: MockInstance

  beforeEach(() => {
    vi.clearAllMocks()
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('returns embedding vectors for multiple texts', async () => {
    const vectors = [makeVector(), makeVector()]
    mockEmbed.mockResolvedValueOnce(makeEmbedResponse(vectors, 100))

    const result = await generateEmbeddings(['text1', 'text2'], {
      apiKey: 'test-key',
    })

    expect(result).toHaveLength(2)
    expect(result?.[0].vector).toEqual(vectors[0])
    expect(result?.[1].vector).toEqual(vectors[1])
    expect(mockEmbed).toHaveBeenCalledWith(
      {
        input: ['text1', 'text2'],
        model: 'voyage-4',
        inputType: 'document',
      },
      { maxRetries: 3 },
    )
  })

  it('returns null when API key is not set', async () => {
    const result = await generateEmbeddings(['text'], { apiKey: '' })

    expect(result).toBeNull()
    expect(warnSpy).toHaveBeenCalled()
  })

  it('returns an empty array for empty input', async () => {
    const result = await generateEmbeddings([], { apiKey: 'test-key' })

    expect(result).toEqual([])
    expect(mockEmbed).not.toHaveBeenCalled()
  })

  it('throws when response count does not match input count', async () => {
    mockEmbed.mockResolvedValueOnce(makeEmbedResponse([makeVector()], 10))

    await expect(
      generateEmbeddings(['text1', 'text2'], { apiKey: 'test-key' }),
    ).rejects.toThrow('Expected 2 embeddings but got 1')
  })

  it('throws when any embedding has wrong dimensions', async () => {
    mockEmbed.mockResolvedValueOnce(
      makeEmbedResponse([makeVector(1024), makeVector(512)], 20),
    )

    await expect(
      generateEmbeddings(['text1', 'text2'], { apiKey: 'test-key' }),
    ).rejects.toThrow(
      'Embedding at index 1: expected 1024 dimensions but got 512',
    )
  })
})
