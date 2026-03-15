import mdxRenderer from '@astrojs/mdx/server.js'
import reactRenderer from '@astrojs/react/server.js'
import type { APIRoute } from 'astro'
import { experimental_AstroContainer } from 'astro/container'
import { render } from 'astro:content'
import { Feed } from 'feed'

import { rssComponents } from '@/components/mdx'
import { getAllPosts, getPostUrl } from '@/utils/posts'

const SITE_URL = 'https://fohte.net'

async function renderPostToHtml(
  post: Awaited<ReturnType<typeof getAllPosts>>[number],
): Promise<string> {
  const container = await experimental_AstroContainer.create()
  container.addServerRenderer({ renderer: reactRenderer })
  container.addServerRenderer({ renderer: mdxRenderer })

  const { Content } = await render(post)
  const html = await container.renderToString(Content, {
    props: { components: rssComponents },
  })

  return html
}

export const GET: APIRoute = async () => {
  const feed = new Feed({
    title: 'fohte.net',
    id: `${SITE_URL}/`,
    link: `${SITE_URL}/`,
    favicon: `${SITE_URL}/icon.png`,
    copyright: 'All rights reserved 2020, Fohte (Hayato Kawai)',
    feed: `${SITE_URL}/feed.atom`,
  })

  const posts = await getAllPosts()

  for (const post of posts.slice(0, 10)) {
    const content = await renderPostToHtml(post)
    feed.addItem({
      title: post.data.title,
      author: [{ name: 'Fohte (Hayato Kawai)', link: `${SITE_URL}/` }],
      content,
      date: post.data.date,
      published: post.data.date,
      description: post.data.description,
      link: `${SITE_URL}${getPostUrl(post)}`,
    })
  }

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
