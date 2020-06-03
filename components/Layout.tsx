import * as React from 'react'
import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/core'

import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title ? `${title} | ` : ''}Fohte Blog</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Flex flexDirection="column" minH="100%" backgroundColor="gray.50">
      <Box>
        <Header />
      </Box>
      <Box as="main" flex="1" h="100%">
        {children}
      </Box>
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  </>
)

export default Layout
