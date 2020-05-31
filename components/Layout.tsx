import * as React from 'react'
import Head from 'next/head'

import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title ? `${title} | ` : ''}Fohte Blog</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout
