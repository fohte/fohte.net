import { Metadata, Viewport } from 'next'

import { Providers } from '@/app/providers'
import { baseUrl, baseUrlJoin } from '@/utils/config'

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    template: '%s | fohte.net',
    default: 'fohte.net',
  },
  openGraph: {
    siteName: 'fohte.net',
    images: [
      {
        url: '/icon.png',
        width: 500,
        height: 500,
      },
    ],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    site: '@fohte',
    creator: '@fohte',
  },
  alternates: {
    types: {
      'application/atom+xml': baseUrlJoin('/feed.atom'),
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
