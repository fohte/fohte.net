import {
  AbsoluteUrl,
  RelativeUrl,
  toAbsoluteUrl,
  toRelativeUrl,
} from '@/utils/url-types'

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
      // Use production URL for preview since the actual preview URL is unpredictable
      return `https://fohte.net`
    case 'development':
    case 'test':
      return 'http://localhost:3000'
  }
}

export const baseUrl = new URL(getBaseUrlString())

export const baseUrlJoin = (path: string): AbsoluteUrl | RelativeUrl => {
  if (env === 'preview') {
    // Return relative URLs in preview environment
    const relativePath = path.startsWith('/') ? path : `/${path}`
    return toRelativeUrl(relativePath)
  }
  // Return absolute URLs in production/development environments
  return toAbsoluteUrl(new URL(path, baseUrl).toString())
}

// For cases where absolute URLs are required (e.g., RSS feeds)
export const getAbsoluteUrl = (path: string): AbsoluteUrl => {
  return toAbsoluteUrl(new URL(path, baseUrl).toString())
}
