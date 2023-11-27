'use client'

import * as React from 'react'

import { flatMap } from 'remeda'
import { GetStaticProps, GetStaticPaths } from 'next'
import NextError from 'next/error'
import { Heading } from '@chakra-ui/react'
import { ParsedUrlQuery } from 'node:querystring'

import { allPosts } from 'contentlayer/generated'
import GlobalLayout from '../../../../components/GlobalLayout'
import { PostList, type PostListProps } from '../../../../components/PostList'
import { Container } from '../../../../components/Container'
import { findPostFrontmatter } from '../../../../utils/contentlayer'

export interface TagPageProps {
  tag?: string
  posts: PostListProps['posts']
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
      posts: allPosts
        .filter(({ tags }) => tags?.includes(headTag))
        .map((post) => ({
          slug: post._raw.flattenedPath,
          frontmatter: findPostFrontmatter(post),
        })),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = flatMap(allPosts, (post) => post.tags).filter(
    (tag) => tag != null,
  )

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}
