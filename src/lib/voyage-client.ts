import { createRequire } from 'node:module'

// Use createRequire to load voyageai via CJS entry point.
// The ESM build of voyageai@0.2.x is broken (voyage-ai/typescript-sdk#26).
const req = createRequire(import.meta.url)
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- CJS require returns any; ESM import is broken (see above)
const { VoyageAIClient } = req('voyageai') as typeof import('voyageai')

export function createVoyageClient(
  apiKey: string,
): InstanceType<typeof VoyageAIClient> {
  return new VoyageAIClient({ apiKey })
}
