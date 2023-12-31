'use client'

import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'
import * as React from 'react'
import ReactYouTube from 'react-youtube'

type Props = React.ComponentProps<typeof ReactYouTube>

export const YouTube: React.FC<Props> = (props) => (
  <Box
    css={css`
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
      overflow: hidden;

      & iframe {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    `}
  >
    <ReactYouTube {...props} />
  </Box>
)
