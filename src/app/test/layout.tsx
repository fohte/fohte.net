import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Fohte Blog',
    default: 'Fohte Blog',
  },
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
