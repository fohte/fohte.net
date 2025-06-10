import { generateFeed } from '@/utils/feed'

export const dynamic = 'force-static'

export async function GET() {
  const feed = await generateFeed()
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
