'use server'

import { allPosts } from 'contentlayer/generated'
import { Feed } from 'feed'

import { baseUrl, baseUrlJoin } from '@/utils/config'
import { mdxToHtml } from '@/utils/mdx'

export const generateFeed = async (): Promise<string> => {
  const feed = new Feed({
    title: 'fohte.net',
    id: baseUrl.toString(),
    link: baseUrl.toString(),
    favicon: baseUrlJoin('/icon.png'),
    copyright: 'All rights reserved 2020, Fohte (Hayato Kawai)',
    feed: baseUrlJoin('/feed.atom'),
  })

  for (const post of allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 10)) {
    const content = await mdxToHtml(post.body.raw)
    feed.addItem({
      title: post.title,
      author: [{ name: 'Fohte (Hayato Kawai)', link: baseUrl.toString() }],
      content,
      date: new Date(post.date),
      published: new Date(post.date),
      description: post.description,
      link: baseUrlJoin(post.url),
    })
  }

  return feed.atom1()
}
