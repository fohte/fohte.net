import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
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
                height: '630px',
              },
              children: [
                // Site name
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '36px',
                            fontWeight: 700,
                            color: '#EF4444',
                          },
                          children: '> ',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '32px',
                            fontWeight: 500,
                            color: '#FAFAFA',
                          },
                          children: 'fohte.net',
                        },
                      },
                    ],
                  },
                },
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '56px',
                      fontWeight: 700,
                      color: '#FAFAFA',
                      lineHeight: 1.2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                    children: post.data.title,
                  },
                },
                // Tags
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexWrap: 'wrap' as const,
                      gap: '12px',
                    },
                    children: tags.map((tag: string) => ({
                      type: 'span',
                      props: {
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
                        children: tag,
                      },
                    })),
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
