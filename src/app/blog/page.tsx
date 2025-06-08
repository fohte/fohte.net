import { Heading } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import * as React from 'react'

import { Container } from '@/components/Container'
import GlobalLayout from '@/components/GlobalLayout'
import { PostList } from '@/components/PostList'
import { findPostFrontmatter } from '@/utils/contentlayer'

export const metadata: Metadata = {
  title: 'Fohte Blog',
}

export default async function PostListPage() {
  // VRTテスト用記事を除外
  const posts = allPosts
    .filter((post) => !post._raw.flattenedPath.includes('vrt-test-'))
    .map((post) => ({
      slug: post._raw.flattenedPath,
      frontmatter: findPostFrontmatter(post),
    }))

  return (
    <GlobalLayout>
      <Container backgroundColor="white">
        <Heading size="md" my={4}>
          記事一覧
        </Heading>

        <PostList posts={posts} />
      </Container>
    </GlobalLayout>
  )
}
