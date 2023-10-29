import * as React from 'react'

import { Heading } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { allPosts } from 'contentlayer/generated'

import { findPostFrontmatter } from '../../utils/contentlayer'
import GlobalLayout from '../../components/GlobalLayout'
import { PostList, type PostListProps } from '../../components/PostList'
import { Container } from '../../components/Container'

interface Props {
  posts: PostListProps['posts']
}

const PostListPage: React.FC<Props> = ({ posts }) => (
  <GlobalLayout showSocial headerTitle="Fohte Blog">
    <Container backgroundColor="white">
      <Heading size="md" my={4}>
        記事一覧
      </Heading>

      <PostList posts={posts} />
    </Container>
  </GlobalLayout>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      posts: allPosts.map((post) => ({
        slug: post._raw.flattenedPath,
        frontmatter: findPostFrontmatter(post),
      })),
    },
  }
}

export default PostListPage
