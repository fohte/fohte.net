import { Metadata } from 'next'

import GlobalLayout from '@/components/GlobalLayout'

export const metadata: Metadata = {
  title: {
    template: '%s | Fohte Blog',
    default: 'Fohte Blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <GlobalLayout headerTitle="Fohte Blog">{children}</GlobalLayout>
}
