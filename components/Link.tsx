import NextLink from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

export interface LinkProps extends ChakraLinkProps {
  hrefAs?: string
}

export const Link: React.FC<LinkProps> = (props) => {
  const { href, hrefAs, ...otherProps } = props

  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return (
      <NextLink href={href} as={hrefAs} passHref>
        <ChakraLink color="blue.500" {...otherProps} />
      </NextLink>
    )
  }

  return <ChakraLink color="blue.500" isExternal {...props} />
}
