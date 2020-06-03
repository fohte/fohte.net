import * as React from 'react'

import { GetStaticProps, GetStaticPaths } from 'next'
import NextError from 'next/error'
import { Heading } from '@chakra-ui/core'

import { frontMatter as posts } from '../posts/*.mdx'
import Layout from '../../components/Layout'
import { PostList } from '../../components/PostList'
import { Container } from '../../components/Container'

console.log('posts', posts)

export interface TagPageProps {
  tag?: string
}

const TagPage: React.FC<TagPageProps> = ({ tag }) => {
  if (tag == null) {
    return <NextError statusCode={404} />
  }

  const filteredPosts = posts.filter((post) => post.tags?.includes(tag))

  return (
    <Layout title={`#${tag} の記事一覧`}>
      <Container backgroundColor="white">
        <Heading size="md" my={4}>
          # {tag} の記事一覧
        </Heading>

        <PostList posts={filteredPosts} />
      </Container>
    </Layout>
  )
}

export default TagPage

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  const tag = params?.tag

  const headTag = Array.isArray(tag) ? tag[0] : tag

  return { props: { tag: headTag } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const nestedTags = posts.map((post) => post.tags || [])

  const tags = nestedTags.reduce((acc, value) => acc.concat(value), [])

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}
