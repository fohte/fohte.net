import { Box, Flex } from '@chakra-ui/react'
import * as React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

type Props = {
  children: React.ReactNode
  headerTitle?: string
}

const GlobalLayout: React.FunctionComponent<Props> = ({
  children,
  headerTitle,
}) => {
  return (
    <Flex flexDirection="column" minH="100%" backgroundColor="gray.50">
      <Box>
        <Header headerTitle={headerTitle} />
      </Box>
      <Box as="main" flex="1" h="100%">
        {children}
      </Box>
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  )
}

export default GlobalLayout
