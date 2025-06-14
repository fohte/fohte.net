import { Heading } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import * as React from 'react'

import { Container } from '@/components/Container'
import { PostList } from '@/components/PostList'
import { findPostFrontmatter } from '@/utils/contentlayer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '記事一覧',
  }
}

export default async function TestBlogListPage() {
  // Return 404 in non-test environments
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'test') {
    notFound()
  }

  // Display only E2E test posts
  const e2eTestPosts = allPosts
    .filter((post) => post._raw.flattenedPath.includes('e2e-test-'))
    .map((post) => ({
      slug: post._raw.flattenedPath,
      frontmatter: findPostFrontmatter(post),
    }))

  return (
    <Container backgroundColor="white">
      <Heading size="md" my={4}>
        記事一覧
      </Heading>

      <PostList posts={e2eTestPosts} />
    </Container>
  )
}
