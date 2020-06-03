import NextLink from 'next/link'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/core'

export const Link: React.FC<LinkProps> = (props) => {
  const href = props.href

  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return (
      <NextLink href={href} passHref>
        <ChakraLink color="blue.500" {...props} />
      </NextLink>
    )
  }

  return <ChakraLink color="blue.500" isExternal {...props} />
}
