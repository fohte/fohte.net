import NextLink from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

export interface LinkProps extends ChakraLinkProps {}

export const isInternalLink = (href: string): boolean => {
  // e.g. `//google.com`
  if (
    href.startsWith('//') ||
    href.startsWith('http://') ||
    href.startsWith('https://')
  ) {
    return false
  }

  // e.g. `/posts/foobar`, `#fn-1`
  return href.startsWith('/') || href.startsWith('#')
}

export const Link: React.FC<LinkProps> = (props) => {
  const { href, ...otherProps } = props

  if (href && isInternalLink(href)) {
    return (
      <ChakraLink href={href} as={NextLink} color="blue.500" {...otherProps} />
    )
  }

  return <ChakraLink color="blue.500" isExternal {...props} />
}
