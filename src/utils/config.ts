export const rootDirPath = process.cwd()

// FIXME: switch production and preview environment on cloudflare pages
export const baseUrl = new URL('https://fohte.net')

export const baseUrlJoin = (path: string) => new URL(path, baseUrl).toString()
