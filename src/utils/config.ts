export const rootDirPath = process.cwd()

export const baseUrl = new URL(
  process.env.CF_PAGES_URL || 'http://localhost:3000',
)

export const baseUrlJoin = (path: string) => new URL(path, baseUrl).toString()
