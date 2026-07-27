import { err, ok, type Result, ResultAsync } from 'neverthrow'

import { EMBEDDING_MODEL, EXPECTED_DIMENSIONS } from '#lib/embedding-constants'
import { createVoyageClient } from '#lib/voyage-client'

const MAX_RETRIES = 3

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

export interface EmbeddingResult {
  /** The embedding vector */
  vector: number[]
  /** Total tokens consumed by this API request */
  totalTokens: number
}

export interface BatchEmbeddingResult {
  /** Embedding vectors, one per input text */
  embeddings: number[][]
  /** Total tokens consumed by the entire batch API request */
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
 * Returns `ok(null)` when the API key is not configured, logging a warning
 * instead of failing so the build can continue with cached data.
 */
export async function generateEmbedding(
  text: string,
  options?: { apiKey?: string },
): Promise<Result<EmbeddingResult | null, Error>> {
  const apiKey = options?.apiKey ?? process.env.VOYAGE_API_KEY

  if (apiKey == null || apiKey === '') {
    console.warn(
      '[voyage-embeddings] VOYAGE_API_KEY is not set. Skipping embedding generation.',
    )
    return ok(null)
  }

  const client = createVoyageClient(apiKey)

  const responseResult: Result<EmbedResponse, Error> =
    await ResultAsync.fromPromise(
      client.embed(
        {
          input: text,
          model: EMBEDDING_MODEL,
          inputType: 'document',
        },
        {
          maxRetries: MAX_RETRIES,
        },
      ),
      toError,
    )
  if (responseResult.isErr()) {
    return err(responseResult.error)
  }
  const response = responseResult.value

  const embeddings = extractEmbeddings(response)
  if (embeddings == null || embeddings.length === 0) {
    return err(
      new Error(
        '[voyage-embeddings] API response did not contain an embedding vector.',
      ),
    )
  }

  const vector = embeddings[0]
  if (vector.length !== EXPECTED_DIMENSIONS) {
    return err(
      new Error(
        `[voyage-embeddings] Expected ${String(EXPECTED_DIMENSIONS)} dimensions but got ${String(vector.length)}.`,
      ),
    )
  }

  return ok({
    vector,
    totalTokens: extractTotalTokens(response),
  })
}

/**
 * Generate embedding vectors for multiple texts in a single API call.
 *
 * Returns `ok(null)` when the API key is not configured.
 */
export async function generateEmbeddings(
  texts: string[],
  options?: { apiKey?: string },
): Promise<Result<BatchEmbeddingResult | null, Error>> {
  const apiKey = options?.apiKey ?? process.env.VOYAGE_API_KEY

  if (apiKey == null || apiKey === '') {
    console.warn(
      '[voyage-embeddings] VOYAGE_API_KEY is not set. Skipping embedding generation.',
    )
    return ok(null)
  }

  if (texts.length === 0) {
    return ok({ embeddings: [], totalTokens: 0 })
  }

  const client = createVoyageClient(apiKey)

  const responseResult: Result<EmbedResponse, Error> =
    await ResultAsync.fromPromise(
      client.embed(
        {
          input: texts,
          model: EMBEDDING_MODEL,
          inputType: 'document',
        },
        {
          maxRetries: MAX_RETRIES,
        },
      ),
      toError,
    )
  if (responseResult.isErr()) {
    return err(responseResult.error)
  }
  const response = responseResult.value

  const embeddings = extractEmbeddings(response)
  if (embeddings == null || embeddings.length !== texts.length) {
    return err(
      new Error(
        `[voyage-embeddings] Expected ${String(texts.length)} embeddings but got ${String(embeddings?.length ?? 0)}.`,
      ),
    )
  }

  for (let i = 0; i < embeddings.length; i++) {
    if (embeddings[i].length !== EXPECTED_DIMENSIONS) {
      return err(
        new Error(
          `[voyage-embeddings] Embedding at index ${String(i)}: expected ${String(EXPECTED_DIMENSIONS)} dimensions but got ${String(embeddings[i].length)}.`,
        ),
      )
    }
  }

  return ok({
    embeddings,
    totalTokens: extractTotalTokens(response),
  })
}
