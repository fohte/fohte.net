import * as React from 'react'

import NextLink from 'next/link'
import { Link, Heading, Text, List, ListItem, Box } from '@chakra-ui/core'

import { FrontMatter } from '../utils/types'
import { TagList } from '../components/TagList'
import { formatDate } from '../utils/date'

export interface PostListProps {
  posts: FrontMatter[]
}

export const PostList: React.FC<PostListProps> = ({ posts }) => (
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
)

const generateLink = (resourcePath: string): string =>
  `/${resourcePath.split('.').slice(0, -1).join('.')}`
