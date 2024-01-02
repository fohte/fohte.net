'use server'

import { allPosts } from 'contentlayer/generated'
import { Feed } from 'feed'

import { baseUrl, baseUrlJoin } from '@/utils/config'

export const generateFeed = async (): Promise<string> => {
  const feed = new Feed({
    title: 'Fohte',
    id: baseUrl.toString(),
    link: baseUrl.toString(),
    favicon: baseUrlJoin('/icon.png'),
    copyright: 'All rights reserved 2020, Fohte (Hayato Kawai)',
    feed: baseUrlJoin('/feed.atom'),
  })

  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 10)
    .forEach(async (post) => {
      feed.addItem({
        title: post.title,
        author: [{ name: 'Fohte (Hayato Kawai)', link: baseUrl.toString() }],
        content: post.mdxHtml,
        date: new Date(post.date),
        description: post.description,
        link: baseUrlJoin(post.url),
      })
    })

  return feed.atom1()
}
