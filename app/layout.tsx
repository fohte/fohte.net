import { Metadata, Viewport } from 'next'

import { Providers } from '@/app/providers'
import GlobalLayout from '@/components/GlobalLayout'

export const metadata: Metadata = {
  metadataBase: new URL('https://fohte.net'),
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
        <Providers>
          <GlobalLayout>{children}</GlobalLayout>
        </Providers>
      </body>
    </html>
  )
}
