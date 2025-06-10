import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { createElement } from 'react'

import { rssComponents } from '@/components/mdx'
import { remarkPlugins } from '@/utils/mdx/config'

// ref: https://github.com/contentlayerdev/contentlayer/issues/94#issuecomment-1385118712
export const mdxToHtml = async (mdxSource: string) => {
  // this is a workaround for the following error:
  // > You're importing a component that imports react-dom/server. To fix it, render or return the content directly as a Server Component instead for perf and security.
  // > Learn more: https://nextjs.org/docs/getting-started/react-essentials
  // see: https://github.com/vercel/next.js/issues/43810#issuecomment-1341136525
  const ReactDOMServer = (await import('react-dom/server')).default

  const { code } = await bundleMDX({
    source: mdxSource,
    mdxOptions: (options) => {
      options.remarkPlugins = remarkPlugins
      return options
    },
  })
  const MDXLayout = getMDXComponent(code)
  try {
    const html = ReactDOMServer.renderToString(
      createElement(MDXLayout, {
        components: rssComponents,
      }),
    )
    return html
  } catch (error) {
    console.error('Error rendering MDX to HTML:', error)
    // Return a simple fallback for RSS feeds
    return mdxSource
  }
}
