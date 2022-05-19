import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getMDXComponent } from 'mdx-bundler/client'
import { getAllPosts, getSinglePost } from '../../utils/mdx'
import { ParsedUrlQuery } from 'node:querystring'
import { MDXLayout } from '../../components/MDXLayout'
import { mdxComponents } from '../../components/mdx'

interface Props extends Awaited<ReturnType<typeof getSinglePost>> {}

interface Params extends ParsedUrlQuery {
  slug: string
}

const Post: React.FC<Props> = ({ code, frontmatter }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <MDXLayout frontMatter={frontmatter}>
      <Component components={mdxComponents} />
    </MDXLayout>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { slug } = params!

  const post = await getSinglePost(slug)
  return {
    props: { ...post },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export default Post
