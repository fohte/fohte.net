import * as React from 'react'
import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/react'

import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  title?: string
  headerTitle?: string
  ogImage?: string
  showSocial?: boolean
  children: React.ReactNode
}

const siteName = 'fohte.net'

const GlobalLayout: React.FunctionComponent<Props> = ({
  children,
  title,
  headerTitle,
  ogImage,
  showSocial,
}) => {
  const formattedTitle = [title, siteName].filter((x) => x).join(' | ')

  return (
    <>
      <Head>
        <title>{formattedTitle}</title>

        <meta
          property="og:image"
          content={ogImage ?? 'https://fohte.net/icon.png'}
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={formattedTitle} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@fohte" />
        <meta name="twitter:site" content="@fohte" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

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
    </>
  )
}

export default GlobalLayout
