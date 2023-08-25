import * as React from 'react'

import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'

import { theme } from '../../styles/theme'

type ImgurImageProps = {
  id: string
  caption: string
  alt: string
  width: number
  height: number
}

export const ImgurImage: React.FC<ImgurImageProps> = ({
  id,
  caption,
  alt,
  width,
  height,
}) => {
  const aspectRatio = (height / width) * 100
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
            <source
              srcSet={`https://i.imgur.com/${id}.webp`}
              type="image/webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={alt}
              src={`https://i.imgur.com/${id}.jpg`}
              loading="lazy"
            />
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
        {caption}
      </Box>
    </Box>
  )
}
