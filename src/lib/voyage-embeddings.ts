import { VoyageAIClient } from 'voyageai'

const EMBEDDING_MODEL = 'voyage-4'
const EXPECTED_DIMENSIONS = 1024
const MAX_RETRIES = 3

export interface EmbeddingResult {
  /** The embedding vector */
  vector: number[]
  /** Total tokens consumed by the entire API request (shared across batch results) */
  totalTokens: number
}

interface EmbedResponseItem {
  embedding?: number[]
}

interface EmbedResponse {
  data?: EmbedResponseItem[]
  usage?: { totalTokens?: number }
}

function extractEmbeddings(response: EmbedResponse): number[][] | undefined {
  const data = response.data
  if (data == null || data.length === 0) {
    return undefined
  }

  const vectors: number[][] = []
  for (const item of data) {
    if (item.embedding == null) {
      return undefined
    }
    vectors.push(item.embedding)
  }
  return vectors
}

function extractTotalTokens(response: EmbedResponse): number {
  return response.usage?.totalTokens ?? 0
}

/**
 * Generate an embedding vector for the given text using Voyage AI.
 *
 * Returns `null` when the API key is not configured, logging a warning
 * instead of failing so the build can continue with cached data.
 */
export async function generateEmbedding(
  text: string,
  options?: { apiKey?: string },
): Promise<EmbeddingResult | null> {
  const apiKey = options?.apiKey ?? process.env.VOYAGE_API_KEY

  if (apiKey == null || apiKey === '') {
    console.warn(
      '[voyage-embeddings] VOYAGE_API_KEY is not set. Skipping embedding generation.',
    )
    return null
  }

  const client = new VoyageAIClient({ apiKey })

  const response: EmbedResponse = await client.embed(
    {
      input: text,
      model: EMBEDDING_MODEL,
      inputType: 'document',
    },
    {
      maxRetries: MAX_RETRIES,
    },
  )

  const embeddings = extractEmbeddings(response)
  if (embeddings == null || embeddings.length === 0) {
    throw new Error(
      '[voyage-embeddings] API response did not contain an embedding vector.',
    )
  }

  const vector = embeddings[0]
  if (vector.length !== EXPECTED_DIMENSIONS) {
    throw new Error(
      `[voyage-embeddings] Expected ${String(EXPECTED_DIMENSIONS)} dimensions but got ${String(vector.length)}.`,
    )
  }

  return {
    vector,
    totalTokens: extractTotalTokens(response),
  }
}

/**
 * Generate embedding vectors for multiple texts in a single API call.
 *
 * Returns `null` when the API key is not configured.
 */
export async function generateEmbeddings(
  texts: string[],
  options?: { apiKey?: string },
): Promise<EmbeddingResult[] | null> {
  const apiKey = options?.apiKey ?? process.env.VOYAGE_API_KEY

  if (apiKey == null || apiKey === '') {
    console.warn(
      '[voyage-embeddings] VOYAGE_API_KEY is not set. Skipping embedding generation.',
    )
    return null
  }

  if (texts.length === 0) {
    return []
  }

  const client = new VoyageAIClient({ apiKey })

  const response: EmbedResponse = await client.embed(
    {
      input: texts,
      model: EMBEDDING_MODEL,
      inputType: 'document',
    },
    {
      maxRetries: MAX_RETRIES,
    },
  )

  const embeddings = extractEmbeddings(response)
  if (embeddings == null || embeddings.length !== texts.length) {
    throw new Error(
      `[voyage-embeddings] Expected ${String(texts.length)} embeddings but got ${String(embeddings?.length ?? 0)}.`,
    )
  }

  for (let i = 0; i < embeddings.length; i++) {
    if (embeddings[i].length !== EXPECTED_DIMENSIONS) {
      throw new Error(
        `[voyage-embeddings] Embedding at index ${String(i)}: expected ${String(EXPECTED_DIMENSIONS)} dimensions but got ${String(embeddings[i].length)}.`,
      )
    }
  }

  const totalTokens = extractTotalTokens(response)
  return embeddings.map((vector) => ({
    vector,
    totalTokens,
  }))
}
