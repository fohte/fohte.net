'use client'

import * as React from 'react'

import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'

import { theme } from '../../styles/theme'

// e.g. https://assets.fohte.net/images/foobar.png
//   => https://assets.fohte.net/images/foobar.webp
const generateWebpUrl = (url: URL): URL => {
  const webpUrl = new URL(url.href)

  webpUrl.pathname = `${webpUrl.pathname.split('.').shift()}.webp`

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

  const aspectRatio = (height / width) * 100

  const extension = url.pathname.split('.').pop()

  const priotizeWebp =
    extension == null || extension === 'png' || extension === 'jpg'

  return (
    <Box as="figure" mt={4}>
      <Box
        css={css`
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: min(${aspectRatio}%, ${height}px);
        `}
      >
        <Box
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: ${width}px;
            height: ${height}px;
            max-width: 100%;
            max-height: 100%;
            background-color: ${theme.colors.gray[100]};
            margin: auto;
          `}
        >
          <picture>
            {priotizeWebp && (
              <source srcSet={generateWebpUrl(url).href} type="image/webp" />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={alt} src={url.href} loading="lazy" />
          </picture>
        </Box>
      </Box>
      <Box
        as="figcaption"
        css={css`
          text-align: center;
          color: var(--chakra-colors-gray-600);
          margin-top: 0.5em;
          font-size: 0.9rem;
        `}
      >
        {alt}
      </Box>
    </Box>
  )
}
