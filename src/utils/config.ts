const getEnv = (): 'production' | 'preview' | 'development' | 'test' => {
  if (
    process.env.CF_PAGES_BRANCH === 'main' ||
    process.env.CF_PAGES_BRANCH === 'master'
  ) {
    return 'production'
  }

  if (process.env.CF_PAGES_URL != null) {
    return 'preview'
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
      if (process.env.CF_PAGES_URL == null) {
        throw new Error('CF_PAGES_URL must be set')
      }
      return process.env.CF_PAGES_URL
    case 'development':
    case 'test':
      return 'http://localhost:3000'
  }
}

export const baseUrl = new URL(getBaseUrlString())
