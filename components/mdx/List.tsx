'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import * as React from 'react'

const StyledBox = styled(Box)`
  ul {
    margin-top: 0.25em;
  }
`

export const List: React.FC<BoxProps> = (props) => (
  <StyledBox mt="1rem" pl={4} ml={2} {...props} />
)
