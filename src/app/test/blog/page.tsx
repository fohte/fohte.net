import { Heading } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import * as React from 'react'

import { Container } from '@/components/Container'
import { PostList } from '@/components/PostList'
import { findPostFrontmatter } from '@/utils/contentlayer'

export default async function TestBlogListPage() {
  // テスト環境以外では404を返す
  if (process.env.APP_ENV !== 'test') {
    notFound()
  }

  // VRTテスト用記事を表示（テスト環境では自動的にフィルタリング済み）
  const vrtTestPosts = allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
    frontmatter: findPostFrontmatter(post),
  }))

  return (
    <Container backgroundColor="white">
      <Heading size="md" my={4}>
        記事一覧
      </Heading>

      <PostList posts={vrtTestPosts} />
    </Container>
  )
}
