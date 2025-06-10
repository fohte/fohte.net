'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import * as React from 'react'

export const List: React.FC<BoxProps> = (props) => (
  <Box
    mt="1rem"
    pl={4}
    ml={2}
    css={{
      '& ul': {
        marginTop: '0.25em',
      },
    }}
    {...props}
  />
)
