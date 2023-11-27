import * as React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  showSocial?: boolean
  children: React.ReactNode
}

const GlobalLayout: React.FunctionComponent<Props> = ({
  children,
  showSocial,
}) => {
  return (
    <Flex flexDirection="column" minH="100%" backgroundColor="gray.50">
      <Box>
        <Header />
      </Box>
      <Box as="main" flex="1" h="100%">
        {children}
      </Box>
      <Box mt="auto">
        <Footer showSocial={showSocial} />
      </Box>
    </Flex>
  )
}

export default GlobalLayout
