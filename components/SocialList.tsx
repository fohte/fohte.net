'use client'

import { Box, List, ListItem } from '@chakra-ui/react'
import * as React from 'react'
import { IconType } from 'react-icons'
import { FaGithub, FaMastodon, FaTwitter } from 'react-icons/fa'

import { Link } from '@/components/Link'

type SocialLinkItem = {
  icon: IconType
  href: string
  linkProps?: React.ComponentProps<typeof Link>
  text: string
}

const socialList: Array<SocialLinkItem> = [
  {
    icon: FaMastodon,
    href: 'https://social.fohte.net/@fohte',
    text: '@fohte@social.fohte.net',
    linkProps: {
      rel: 'me',
    },
  },
  {
    icon: FaTwitter,
    href: 'https://twitter.com/fohte',
    text: 'fohte',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/fohte',
    text: 'fohte',
  },
]

export const SocialList: React.FC = () => (
  <List>
    {socialList.map((social) => (
      <ListItem key={social.href} mt={1}>
        <Link href={social.href} color="gray.700" {...social.linkProps}>
          <Box as={social.icon} display="inline" mr={2} />
          {social.text}
        </Link>
      </ListItem>
    ))}
  </List>
)
