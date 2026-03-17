import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import { format } from 'date-fns'
import satori from 'satori'
import sharp from 'sharp'

const require = createRequire(import.meta.url)

const resolve = (pkg: string, file: string) =>
  require.resolve(`${pkg}/files/${file}`)

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts')
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props

  const formattedDate = format(post.data.date, 'yyyy-MM-dd')
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

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%)',
          position: 'relative',
          fontFamily: 'IBM Plex Mono, Noto Sans JP',
        },
        children: [
          // Accent top line
          {
            type: 'div',
            props: {
              style: {
                width: '1200px',
                height: '4px',
                backgroundColor: '#DC2626',
                position: 'absolute',
                top: 0,
                left: 0,
              },
            },
          },
          // Border
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1200px',
                height: '630px',
                border: '1px solid #2A2A2A',
                boxSizing: 'border-box',
              },
            },
          },
          // Content
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '24px',
                padding: '80px',
                height: '470px',
                marginTop: '80px',
              },
              children: [
                // Prompt
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: '#A1A1AA',
                    },
                    children: `$ cat ~/posts/${post.id}`,
                  },
                },
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '48px',
                      fontWeight: 700,
                      color: '#FAFAFA',
                      lineHeight: 1.2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                    children: post.data.title,
                  },
                },
                // Meta row
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: '#71717A',
                    },
                    children: [
                      formattedDate,
                      tags.length > 0 ? ` // ${tags.join(', ')}` : '',
                    ].join(''),
                  },
                },
              ],
            },
          },
          // Footer
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 80px',
                height: '80px',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#EF4444',
                          },
                          children: '>',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#FAFAFA',
                          },
                          children: 'fohte.net',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    {
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
    },
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
