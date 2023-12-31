import { allPosts } from 'contentlayer/generated'
import { Feed } from 'feed'

import { baseUrl, baseUrlJoin } from '@/utils/config'

export const generateFeed = (): string => {
  const feed = new Feed({
    title: 'Fohte',
    id: baseUrl.toString(),
    link: baseUrl.toString(),
    favicon: baseUrlJoin('/favicon.ico'),
    copyright: 'All rights reserved 2020, Fohte (Hayato Kawai)',
  })

  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 10)
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        date: new Date(post.date),
        description: post.description,
        link: baseUrlJoin(post.url),
      })
    })

  return feed.atom1()
}
