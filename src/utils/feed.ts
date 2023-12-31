import { allPosts } from 'contentlayer/generated'
import { Feed } from 'feed'
import { baseUrl } from '@/utils/config'

export const generateFeed = (): string => {
  const feed = new Feed({
    title: 'Fohte',
    id: baseUrl,
    link: baseUrl,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: 'All rights reserved 2020, Fohte (Hayato Kawai)',
  })

  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        date: new Date(post.date),
        description: post.description,
        link: `${baseUrl}${post.url}`,
      })
    })

  return feed.atom1()
}
