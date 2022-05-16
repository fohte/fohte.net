import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'

import { Global, css } from '@emotion/react'

const globalStyles = css`
  // hack to fix footer to the bottom
  body,
  html,
  body > div:first-of-type {
    width: 100%;
    height: 100%;
  }

  div.footnotes {
    margin-top: 4rem;
    font-size: 0.9rem;
  }
`

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Global styles={globalStyles} />

      <Component {...pageProps} />
    </ChakraProvider>
  )
}
