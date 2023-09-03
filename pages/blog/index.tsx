import * as React from 'react'

import { Heading } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import GlobalLayout from '../../components/GlobalLayout'
import { PostList } from '../../components/PostList'
import { Container } from '../../components/Container'
import { getAllPosts, AllPosts } from '../../utils/mdx'

interface Props {
  posts: AllPosts
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
  const posts = getAllPosts()

  return {
    props: { posts },
  }
}

export default PostListPage
