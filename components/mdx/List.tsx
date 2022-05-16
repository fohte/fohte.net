import * as React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'
import styled from '@emotion/styled'

const StyledBox = styled(Box)`
  ul {
    margin-top: 0.25em;
  }
`

export const List: React.FC<BoxProps> = (props) => (
  <StyledBox mt="1rem" pl={4} ml={2} {...props} />
)
