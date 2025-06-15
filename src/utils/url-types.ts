type Brand<K, T> = K & { __brand: T }

export type AbsoluteUrl = Brand<string, 'AbsoluteUrl'>
export type RelativeUrl = Brand<string, 'RelativeUrl'>

// Type guards
export const isAbsoluteUrl = (url: string): url is AbsoluteUrl => {
  return /^https?:\/\//.test(url)
}

export const isRelativeUrl = (url: string): url is RelativeUrl => {
  return url.startsWith('/')
}

// Constructor functions
export const toAbsoluteUrl = (url: string): AbsoluteUrl => {
  if (!isAbsoluteUrl(url)) {
    throw new Error(`Invalid absolute URL: ${url}`)
  }
  return url as AbsoluteUrl
}

export const toRelativeUrl = (url: string): RelativeUrl => {
  if (!isRelativeUrl(url)) {
    throw new Error(`Invalid relative URL: ${url}`)
  }
  return url as RelativeUrl
}
