'use client'

import type * as React from 'react'

// e.g. https://assets.fohte.net/images/foobar.png
//   => https://assets.fohte.net/images/foobar.webp
const generateWebpUrl = (url: URL): URL => {
  const webpUrl = new URL(url.href)
  webpUrl.pathname = `${webpUrl.pathname.replace(/\.[^/.]+$/, '')}.webp`
  return webpUrl
}

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export const Image: React.FC<ImageProps> = ({ alt, src }) => {
  if (src == null) {
    throw new Error('Image src is required')
  }

  const url = new URL(src)
  const params = url.searchParams
  const width = Number(params.get('w'))
  const height = Number(params.get('h'))
  params.delete('w')
  params.delete('h')

  if (
    Number.isNaN(width) ||
    Number.isNaN(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(
      `Image 'src' must have valid 'w' and 'h' URL parameters: ${src}`,
    )
  }

  const aspectRatio = (height / width) * 100

  const extension = url.pathname.split('.').pop()

  const prioritizeWebp =
    extension == null || extension === 'png' || extension === 'jpg'

  return (
    <figure className="mt-4">
      <div
        className="relative h-0 w-full"
        style={{ paddingBottom: `min(${aspectRatio}%, ${height}px)` }}
      >
        <div
          className="absolute left-0 right-0 top-0 mx-auto max-h-full max-w-full bg-gray-100"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <picture>
            {prioritizeWebp && (
              <source srcSet={generateWebpUrl(url).href} type="image/webp" />
            )}
            <img alt={alt} src={url.href} loading="lazy" />
          </picture>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[0.9rem] text-gray-600">
        {alt}
      </figcaption>
    </figure>
  )
}
