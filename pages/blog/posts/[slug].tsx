import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { allPosts, type Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ParsedUrlQuery } from 'node:querystring'
import { MDXLayout } from '../../../components/MDXLayout'
import { mdxComponents } from '../../../components/mdx'
import { findPostFrontmatter } from '../../../utils/contentlayer'

type Props = {
  post: Post
}

interface Params extends ParsedUrlQuery {
  slug: string
}

const Post: React.FC<Props> = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <MDXLayout frontMatter={findPostFrontmatter(post)}>
      <MDXContent components={mdxComponents} />
    </MDXLayout>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { slug } = params!

  const post = allPosts.find((post) => post._raw.flattenedPath === slug)

  if (!post) return { notFound: true }

  return {
    props: { post },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = allPosts.map((post) => ({
    params: { slug: post._raw.flattenedPath },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Post
