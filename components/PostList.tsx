import * as React from 'react'

import { Heading, Text, List, ListItem, Box } from '@chakra-ui/react'

import { type PostFrontmatter } from '../utils/contentlayer'
import { Link } from '../components/Link'
import { TagList } from '../components/TagList'
import { formatDate } from '../utils/date'

export interface PostListProps {
  posts: { slug: string; frontmatter: PostFrontmatter }[]
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const sortedPosts = posts.sort(
    (a, b) =>
      Number(new Date(b.frontmatter.date)) -
      Number(new Date(a.frontmatter.date)),
  )

  return (
    <List>
      {sortedPosts.map((post) => (
        <ListItem
          key={post.slug}
          _notLast={{ borderBottom: '1px solid #ddd', mb: 2 }}
        >
          <Box paddingY="1rem">
            <Link
              href={`/blog/posts/${post.slug}`}
              color="black"
              display="block"
              _hover={{ outline: 'none' }}
            >
              <Text fontSize="sm" mb="0.5em">
                {formatDate(post.frontmatter.date)}
              </Text>
              <Heading as="h1" fontSize="xl" mb={{ base: 2, md: 3 }}>
                {post.frontmatter.title}
              </Heading>
            </Link>
            {post.frontmatter.tags && (
              <Box>
                <TagList tags={post.frontmatter.tags} />
              </Box>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  )
}
