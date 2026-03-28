import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

import type { APIRoute, InferGetStaticPropsType } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'
import { createElement } from 'react'
import satori from 'satori'
import sharp from 'sharp'

const require = createRequire(import.meta.url)

const resolve = (pkg: string, file: string) =>
  require.resolve(`${pkg}/files/${file}`)

export const getStaticPaths = async () => {
  const posts = await getCollection('posts')
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export const GET: APIRoute<Props> = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'posts'> }

  const tags = post.data.tags ?? []

  // Load fonts from @fontsource packages (woff format, satori compatible)
  const [mono400, mono700, jp400, jp700] = await Promise.all([
    readFile(
      resolve(
        '@fontsource/ibm-plex-mono',
        'ibm-plex-mono-latin-400-normal.woff',
      ),
    ),
    readFile(
      resolve(
        '@fontsource/ibm-plex-mono',
        'ibm-plex-mono-latin-700-normal.woff',
      ),
    ),
    readFile(
      resolve(
        '@fontsource/noto-sans-jp',
        'noto-sans-jp-japanese-400-normal.woff',
      ),
    ),
    readFile(
      resolve(
        '@fontsource/noto-sans-jp',
        'noto-sans-jp-japanese-700-normal.woff',
      ),
    ),
  ])

  const h = createElement

  const element = h(
    'div',
    {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column' as const,
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%)',
        position: 'relative' as const,
        fontFamily: 'IBM Plex Mono, Noto Sans JP',
      },
    },
    // Accent top line
    h('div', {
      style: {
        width: '1200px',
        height: '4px',
        backgroundColor: '#DC2626',
        position: 'absolute' as const,
        top: 0,
        left: 0,
      },
    }),
    // Border
    h('div', {
      style: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '1200px',
        height: '630px',
        border: '1px solid #2A2A2A',
        boxSizing: 'border-box' as const,
      },
    }),
    // Content
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
          gap: '24px',
          padding: '80px',
          height: '630px',
        },
      },
      // Site name
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          },
        },
        h(
          'span',
          {
            style: {
              fontSize: '36px',
              fontWeight: 700,
              color: '#EF4444',
            },
          },
          '> ',
        ),
        h(
          'span',
          {
            style: {
              fontSize: '32px',
              fontWeight: 500,
              color: '#FAFAFA',
            },
          },
          'fohte.net',
        ),
      ),
      // Title
      h(
        'div',
        {
          style: {
            fontSize: '56px',
            fontWeight: 700,
            color: '#FAFAFA',
            lineHeight: 1.2,
            overflow: 'hidden' as const,
            textOverflow: 'ellipsis',
          },
        },
        post.data.title,
      ),
      // Tags
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '12px',
          },
        },
        ...tags.map((tag) =>
          h(
            'span',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                fontSize: '28px',
                fontWeight: 500,
                color: '#A1A1AA',
                backgroundColor: '#1F1F1F',
                border: '1px solid #2A2A2A',
                borderRadius: '4px',
                padding: '8px 20px',
              },
            },
            tag,
          ),
        ),
      ),
    ),
  )

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'IBM Plex Mono',
        data: mono400,
        weight: 400,
        style: 'normal' as const,
      },
      {
        name: 'IBM Plex Mono',
        data: mono700,
        weight: 700,
        style: 'normal' as const,
      },
      {
        name: 'Noto Sans JP',
        data: jp400,
        weight: 400,
        style: 'normal' as const,
      },
      {
        name: 'Noto Sans JP',
        data: jp700,
        weight: 700,
        style: 'normal' as const,
      },
    ],
  })

  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
