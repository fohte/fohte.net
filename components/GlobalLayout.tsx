import * as React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Metadata } from 'next'

import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  headerTitle?: string
  showSocial?: boolean
  children: React.ReactNode
}

const siteName = 'fohte.net'

export const metadata: Metadata = {
  title: siteName,
  openGraph: {
    siteName: siteName,
    images: [
      {
        url: 'https://fohte.net/icon.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    site: '@fohte',
    creator: '@fohte',
  },
}

const GlobalLayout: React.FunctionComponent<Props> = ({
  children,
  headerTitle,
  showSocial,
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
        <Footer showSocial={showSocial} />
      </Box>
    </Flex>
  )
}

export default GlobalLayout
