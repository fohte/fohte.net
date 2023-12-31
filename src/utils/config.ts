export const rootDirPath = process.cwd()

export const baseUrl = new URL(
  process.env.CF_PAGES_URL || 'http://localhost:3000',
)

