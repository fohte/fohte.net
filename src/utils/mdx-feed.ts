import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import * as ReactDOMServer from 'react-dom/server'

import { rssComponents } from '@/components/mdx'

// ref: https://github.com/contentlayerdev/contentlayer/issues/94#issuecomment-1385118712
export const mdxToHtml = async (mdxSource: string) => {
  const { code } = await bundleMDX({ source: mdxSource })
  const MDXLayout = getMDXComponent(code)
  const element = MDXLayout({ components: rssComponents })!
  const html = ReactDOMServer.renderToString(element as any)
  return html
}
