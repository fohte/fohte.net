import * as React from 'react'

import { Heading } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'

import { findPostFrontmatter } from '../../utils/contentlayer'
import { PostList } from '../../components/PostList'
import { Container } from '../../components/Container'

export default async function PostListPage() {
  const posts = allPosts.map((post) => ({
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
