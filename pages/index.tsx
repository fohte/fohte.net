import * as React from 'react'

import NextLink from 'next/link'
import { Link, Heading, Text, List, ListItem, Box } from '@chakra-ui/core'

import { frontMatter as posts } from './posts/*.mdx'
import Layout from '../components/Layout'
import { TagList } from '../components/TagList'
import { Container } from '../components/Container'
import { formatDate } from '../utils/date'

type Props = {}

const PostListPage: React.FC<Props> = () => (
  <Layout>
    <Container backgroundColor="white">
      <Heading size="md" my={4}>
        記事一覧
      </Heading>

      <List>
        {posts.map((post) => (
          <ListItem
            key={post.__resourcePath}
            _notLast={{ borderBottom: '1px solid #ddd', mb: 2 }}
          >
            <NextLink href={generateLink(post.__resourcePath)}>
              <Link display="block" _hover={{ outline: 'none' }}>
                <Box paddingY="1rem">
                  <Text fontSize="sm" mb="0.5em">
                    {formatDate(post.date)}
                  </Text>
                  <Heading as="h1" fontSize="xl" mb={{ base: 2, md: 3 }}>
                    {post.title}
                  </Heading>
                  {post.tags && (
                    <Box>
                      <TagList tags={post.tags} />
                    </Box>
                  )}
                </Box>
              </Link>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Container>
  </Layout>
)

const generateLink = (resourcePath: string): string =>
  `/${resourcePath.split('.').slice(0, -1).join('.')}`

export default PostListPage
