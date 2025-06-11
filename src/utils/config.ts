export const rootDirPath = process.cwd()

const getEnv = (): 'production' | 'preview' | 'development' | 'test' => {
  // Debug logging
  console.log('Environment variables:', {
    APP_ENV: process.env.APP_ENV,
    NODE_ENV: process.env.NODE_ENV,
    CF_PAGES_BRANCH: process.env.CF_PAGES_BRANCH,
    CF_PAGES_URL: process.env.CF_PAGES_URL,
  })

  // APP_ENV takes precedence
  if (
    process.env.APP_ENV === 'production' ||
    process.env.APP_ENV === 'preview' ||
    process.env.APP_ENV === 'development' ||
    process.env.APP_ENV === 'test'
  ) {
    console.log('Using APP_ENV:', process.env.APP_ENV)
    return process.env.APP_ENV
  }

  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    console.log('Using NODE_ENV:', process.env.NODE_ENV)
    return process.env.NODE_ENV
  }

  throw new Error('unknown env')
}

export const env = getEnv()
console.log('Final env value:', env)

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
