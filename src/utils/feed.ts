'use server'

import { allPosts } from 'contentlayer/generated'
import { Feed } from 'feed'

import { getAbsoluteUrl } from '@/utils/config'
import { mdxToHtml } from '@/utils/mdx'

export const generateFeed = async (): Promise<string> => {
  const feed = new Feed({
    title: 'fohte.net',
    id: getAbsoluteUrl('/'),
    link: getAbsoluteUrl('/'),
    favicon: getAbsoluteUrl('/icon.png'),
    copyright: 'All rights reserved 2020, Fohte (Hayato Kawai)',
    feed: getAbsoluteUrl('/feed.atom'),
  })

  for (const post of allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 10)) {
    const content = await mdxToHtml(post.body.raw)
    feed.addItem({
      title: post.title,
      author: [{ name: 'Fohte (Hayato Kawai)', link: getAbsoluteUrl('/') }],
      content,
      date: new Date(post.date),
      published: new Date(post.date),
      description: post.description,
      link: getAbsoluteUrl(post.url),
    })
  }

  return feed.atom1()
}
