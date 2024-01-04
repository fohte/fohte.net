'use server'

import { generateFeed } from '@/utils/feed'

export async function GET() {
  const feed = await generateFeed()
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
