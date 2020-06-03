import { AppProps } from 'next/app'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import { theme } from '../styles/theme'

import { Global, css } from '@emotion/core'

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

    > hr {
      border: none;
    }
  }
`

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Global styles={globalStyles} />

      <Component {...pageProps} />
    </ThemeProvider>
  )
}
