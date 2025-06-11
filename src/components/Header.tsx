import { Box, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'

type HeaderProps = {
  headerTitle?: string
}

export const Header: React.FC<HeaderProps> = ({ headerTitle }) => {
  const siteTitle = headerTitle || 'fohte.net'

  return (
    <Box as="header">
      <Container py={6}>
        <Flex align="center">
          <Heading as="h1" size="md">
            <Flex align="center" gap="4">
              <Link href="/" boxSize="1.5em">
                <Image src="/icon.png" alt="icon" />
              </Link>
              <Link href="/" color="black">
                <Text>{siteTitle}</Text>
              </Link>
            </Flex>
          </Heading>
          <Spacer />
          <Box>
            <Flex gap="6">
              <Link href="/" color="black">
                <Text>About</Text>
              </Link>
              <Link href="/projects" color="black">
                <Text>Projects</Text>
              </Link>
              <Link href="/blog" color="black">
                <Text>Blog</Text>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
