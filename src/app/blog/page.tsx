import { Heading } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import * as React from 'react'

import { Container } from '@/components/Container'
import { PostList } from '@/components/PostList'
import { findPostFrontmatter } from '@/utils/contentlayer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: '記事一覧 | Fohte Blog',
    },
  }
}

export default async function PostListPage() {
  // E2Eテスト用記事を除外
  const posts = allPosts
    .filter((post) => !post._raw.flattenedPath.includes('e2e-test-'))
    .map((post) => ({
      slug: post._raw.flattenedPath,
      frontmatter: findPostFrontmatter(post),
    }))

  return (
    <Container backgroundColor="white">
      <Heading size="md" my={4}>
        記事一覧
      </Heading>

      <PostList posts={posts} />
    </Container>
  )
}
