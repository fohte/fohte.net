import * as React from 'react'

import NextLink from 'next/link'
import { Link, Heading, Text, List, ListItem, Box } from '@chakra-ui/core'

import { FrontMatter } from '../utils/types'
import { TagList } from '../components/TagList'
import { formatDate } from '../utils/date'

export interface PostListProps {
  posts: FrontMatter[]
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const sortedPosts = posts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  )

  return (
    <List>
      {sortedPosts.map((post) => (
        <ListItem
          key={post.__resourcePath}
          _notLast={{ borderBottom: '1px solid #ddd', mb: 2 }}
        >
          <Box paddingY="1rem">
            <NextLink href={generateLink(post.__resourcePath)}>
              <Link display="block" _hover={{ outline: 'none' }}>
                <Text fontSize="sm" mb="0.5em">
                  {formatDate(post.date)}
                </Text>
                <Heading as="h1" fontSize="xl" mb={{ base: 2, md: 3 }}>
                  {post.title}
                </Heading>
              </Link>
            </NextLink>
            {post.tags && (
              <Box>
                <TagList tags={post.tags} />
              </Box>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

const generateLink = (resourcePath: string): string =>
  `/${resourcePath.split('.').slice(0, -1).join('.')}`
