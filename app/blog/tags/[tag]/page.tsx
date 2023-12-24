import { ParsedUrlQuery } from 'node:querystring'

import { Heading } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { flatMap } from 'remeda'

import { Container } from '../../../../components/Container'
import { PostList } from '../../../../components/PostList'
import { findPostFrontmatter } from '../../../../utils/contentlayer'

type Props = {
  params: Params
}

interface Params extends ParsedUrlQuery {
  tag: string
}

export default function TagPage({ params: { tag } }: Props) {
  if (tag == null) {
    notFound()
  }

  const posts = allPosts
    .filter(({ tags }) => tags?.includes(tag))
    .map((post) => ({
      slug: post._raw.flattenedPath,
      frontmatter: findPostFrontmatter(post),
    }))

  return (
    <Container backgroundColor="white">
      <Heading size="md" my={4}>
        # {tag} の記事一覧
      </Heading>

      <PostList posts={posts} />
    </Container>
  )
}

export async function generateStaticParams() {
  return flatMap(allPosts, (post) => post.tags)
    .filter((tag) => tag != null)
    .map((tag) => ({ tag }))
}
