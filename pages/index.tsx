import * as React from 'react'

import { Heading } from '@chakra-ui/core'

import { frontMatter as posts } from './posts/*.mdx'
import Layout from '../components/Layout'
import { PostList } from '../components/PostList'
import { Container } from '../components/Container'

type Props = {}

const PostListPage: React.FC<Props> = () => (
  <Layout>
    <Container backgroundColor="white">
      <Heading size="md" my={4}>
        記事一覧
      </Heading>

      <PostList posts={posts} />
    </Container>
  </Layout>
)

export default PostListPage
