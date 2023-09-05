import { FaTwitter, FaGithub, FaMastodon } from 'react-icons/fa'
import { IconType } from 'react-icons'

import { Link } from '../components/Link'

export type SocialLinkItem = {
  icon: IconType
  href: string
  linkProps?: React.ComponentProps<typeof Link>
  text: string
}

export const socialList: Array<SocialLinkItem> = [
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
