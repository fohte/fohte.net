import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRemoteRefresh } from 'next-remote-refresh/hook'

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
`

// https://github.com/syntax-tree/mdast-util-to-hast/tree/dfd724a5e62fc270e71bc2d5a2e4471be0c5ef5b#css
const footnoteStyles = css`
  /* Style the footnotes section. */
  .footnotes {
    font-size: smaller;
    border-top: 1px solid var(--chakra-colors-gray-200);

    margin-top: 4rem;
    font-size: 0.9rem;
  }

  /* Hide the section label for visual users. */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    word-wrap: normal;
    border: 0;
  }

  /* Place [ and ] around footnote calls. */
  [data-footnote-ref]::before {
    content: '[';
  }

  [data-footnote-ref]::after {
    content: ']';
  }
`

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useRemoteRefresh({
    shouldRefresh: (path) => {
      const { slug } = router.query
      return path.includes(Array.isArray(slug) ? slug[0] : slug || '')
    },
  })

  return (
    <ChakraProvider theme={theme}>
      <Global styles={[globalStyles, footnoteStyles]} />

      <Component {...pageProps} />
    </ChakraProvider>
  )
}
