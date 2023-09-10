import * as React from 'react'

import { Box, List, ListItem } from '@chakra-ui/react'

import { Link } from './Link'
import { socialList } from '../utils/socialList'

export const FooterSocialList: React.FC = () => (
  <List>
    {socialList.map((social) => (
      <ListItem key={social.href} mt={1}>
        <Link href={social.href} color="gray.500" {...social.linkProps}>
          <Box as={social.icon} display="inline" mr={2} />
          {social.text}
        </Link>
      </ListItem>
    ))}
  </List>
)
