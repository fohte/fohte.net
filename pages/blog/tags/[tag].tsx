import * as React from 'react'

import { GetStaticProps, GetStaticPaths } from 'next'
import NextError from 'next/error'
import { Heading } from '@chakra-ui/react'
import { ParsedUrlQuery } from 'node:querystring'

import { getAllPosts, AllPosts } from '../../../utils/mdx'
import GlobalLayout from '../../../components/GlobalLayout'
import { PostList } from '../../../components/PostList'
import { Container } from '../../../components/Container'

export interface TagPageProps {
  tag?: string
  posts: AllPosts
}

interface Params extends ParsedUrlQuery {
  tag: string
}

const TagPage: React.FC<TagPageProps> = ({ tag, posts }) => {
  if (tag == null) {
    return <NextError statusCode={404} />
  }

  return (
    <GlobalLayout title={`#${tag} の記事一覧`}>
      <Container backgroundColor="white">
        <Heading size="md" my={4}>
          # {tag} の記事一覧
        </Heading>

        <PostList posts={posts} />
      </Container>
    </GlobalLayout>
  )
}

export default TagPage

export const getStaticProps: GetStaticProps<TagPageProps, Params> = async ({
  params,
}) => {
  const { tag } = params!

  const headTag = Array.isArray(tag) ? tag[0] : tag

  return {
    props: {
      tag: headTag,
      posts: getAllPosts().filter(
        ({ frontmatter }) => frontmatter.tags?.includes(headTag),
      ),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const nestedTags = getAllPosts().map(
    ({ frontmatter }) => frontmatter.tags || [],
  )

  const tags = nestedTags.reduce((acc, value) => acc.concat(value), [])

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}
