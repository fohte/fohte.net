import * as React from 'react'

import { PseudoBox, List, ListItem } from '@chakra-ui/core'

import { Link } from './Link'

export interface TagListProps {
  tags: string[]
}

export const TagList: React.FC<TagListProps> = ({ tags }) => (
  <List>
    {tags.map((tag) => (
      <ListItem key={tag}>
        <Link color="gray.500" href={`/tags/[tag]`} hrefAs={`/tags/${tag}`}>
          <PseudoBox
            display="inline-block"
            px={2}
            py={1}
            fontSize="xs"
            backgroundColor="gray.100"
            _hover={{ backgroundColor: 'gray.200' }}
          >
            # {tag}
          </PseudoBox>
        </Link>
      </ListItem>
    ))}
  </List>
)
