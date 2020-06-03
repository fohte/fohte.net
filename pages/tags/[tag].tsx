import * as React from 'react'

import { useRouter } from 'next/router'
import { Heading } from '@chakra-ui/core'

import { frontMatter as posts } from '../posts/*.mdx'
import Layout from '../../components/Layout'
import { PostList } from '../../components/PostList'
import { Container } from '../../components/Container'

const TagPage: React.FC = () => {
  const router = useRouter()
  const { tag } = router.query

  const headTag = Array.isArray(tag) ? tag[0] : tag

  const filteredPosts = posts.filter((post) => post.tags?.includes(headTag))

  return (
    <Layout>
      <Container backgroundColor="white">
        <Heading size="md" my={4}>
          # {headTag}
        </Heading>

        <PostList posts={filteredPosts} />
      </Container>
    </Layout>
  )
}

export default TagPage
