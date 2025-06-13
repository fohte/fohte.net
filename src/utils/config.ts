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
      return `https://preview.fohte.net`
    case 'development':
    case 'test':
      return 'http://localhost:3000'
  }
}

export const baseUrl = new URL(getBaseUrlString())

export const baseUrlJoin = (path: string): AbsoluteUrl | RelativeUrl => {
  if (env === 'preview') {
    // preview環境では相対URLを返す
    const relativePath = path.startsWith('/') ? path : `/${path}`
    return toRelativeUrl(relativePath)
  }
  // production/development環境では絶対URLを返す
  return toAbsoluteUrl(new URL(path, baseUrl).toString())
}

// RSS など絶対URLが必要な場合に使用
export const getAbsoluteUrl = (path: string): AbsoluteUrl => {
  const baseUrlString =
    env === 'preview' ? 'https://fohte.net' : getBaseUrlString()
  return toAbsoluteUrl(new URL(path, baseUrlString).toString())
}
