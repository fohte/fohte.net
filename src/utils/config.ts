export const rootDirPath = process.cwd()

const getEnv = (): 'production' | 'preview' | 'development' | 'test' => {
  // Debug logging
  console.log('Environment variables:', {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NODE_ENV: process.env.NODE_ENV,
  })

  // NEXT_PUBLIC_APP_ENV takes precedence
  if (
    process.env.NEXT_PUBLIC_APP_ENV === 'production' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'preview' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'development' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'test'
  ) {
    console.log('Using NEXT_PUBLIC_APP_ENV:', process.env.NEXT_PUBLIC_APP_ENV)
    return process.env.NEXT_PUBLIC_APP_ENV
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
