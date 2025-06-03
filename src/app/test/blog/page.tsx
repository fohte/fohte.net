import { Heading } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'
import * as React from 'react'

import { Container } from '@/components/Container'
import { PostList } from '@/components/PostList'
import { findPostFrontmatter } from '@/utils/contentlayer'

export default async function TestBlogListPage() {
  // Filter only VRT test posts
  const vrtTestPosts = allPosts
    .filter((post) => post._raw.flattenedPath.includes('vrt-test-'))
    .map((post) => ({
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
