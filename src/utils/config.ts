export const rootDirPath = process.cwd()

const getEnv = (): 'production' | 'preview' | 'development' | 'test' => {
  // NEXT_PUBLIC_APP_ENV takes precedence
  if (
    process.env.NEXT_PUBLIC_APP_ENV === 'production' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'preview' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'development' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'test'
  ) {
    return process.env.NEXT_PUBLIC_APP_ENV
  }

  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    return process.env.NODE_ENV
  }

  throw new Error('unknown env')
}

export const env = getEnv()

const getBaseUrlString = (): string => {
  switch (env) {
    case 'production':
      return `https://fohte.net`
    case 'preview':
      return `https://preview.fohte.net`
    case 'development':
    case 'test':
      return 'http://localhost:3000'
  }
}

export const baseUrl = new URL(getBaseUrlString())

export const baseUrlJoin = (path: string) => new URL(path, baseUrl).toString()
