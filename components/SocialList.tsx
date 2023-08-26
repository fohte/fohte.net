import * as React from 'react'

import { Box, List, ListItem } from '@chakra-ui/react'
import { FaTwitter, FaGithub, FaMastodon } from 'react-icons/fa'
import { IconType } from 'react-icons'

import { Link } from '../components/Link'

interface IconProps {
  icon: IconType
  href: string
  linkProps?: React.ComponentProps<typeof Link>
  children: React.ReactNode
}

const SocialLink: React.FC<IconProps> = ({
  icon,
  href,
  linkProps,
  children,
}) => (
  <>
    <Link href={href} color="gray.500" {...linkProps}>
      <Box as={icon} display="inline" mr={2} />
      {children}
    </Link>
  </>
)

const socialList: Array<IconProps> = [
  {
    icon: FaMastodon,
    href: 'https://social.fohte.net/@fohte',
    children: '@fohte@social.fohte.net',
    linkProps: {
      rel: 'me',
    },
  },
  {
    icon: FaTwitter,
    href: 'https://twitter.com/fohte',
    children: 'fohte',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/fohte',
    children: 'fohte',
  },
]

export const SocialList: React.FC = () => (
  <List>
    {socialList.map((social) => (
      <ListItem key={social.href} mt={1}>
        <SocialLink {...social} />
      </ListItem>
    ))}
  </List>
)
