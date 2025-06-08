import GlobalLayout from '@/components/GlobalLayout'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <GlobalLayout headerTitle="Fohte Blog">{children}</GlobalLayout>
}
