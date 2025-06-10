import { Box, List } from '@chakra-ui/react'
import * as React from 'react'

import { Link } from '@/components/Link'

export interface TagListProps {
  tags: string[]
}

export const TagList: React.FC<TagListProps> = ({ tags }) => (
  <List.Root>
    {tags.map((tag) => (
      <List.Item key={tag}>
        <Link color="gray.500" href={`/blog/tags/${tag}`}>
          <Box
            display="inline-block"
            px={2}
            py={1}
            fontSize="sm"
            backgroundColor="gray.100"
            _hover={{ backgroundColor: 'gray.200' }}
          >
            # {tag}
          </Box>
        </Link>
      </List.Item>
    ))}
  </List.Root>
)
