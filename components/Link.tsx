import NextLink from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

export interface LinkProps extends ChakraLinkProps {
  hrefAs?: string
}

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
  const { href, hrefAs, ...otherProps } = props

  if (href && isInternalLink(href)) {
    return (
      <NextLink href={href} as={hrefAs} passHref>
        <ChakraLink color="blue.500" {...otherProps} />
      </NextLink>
    )
  }

  return <ChakraLink color="blue.500" isExternal {...props} />
}
