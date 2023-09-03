import { Box, Text, Heading, Image, Flex, Spacer } from '@chakra-ui/react'

import { Link } from './Link'
import { Container } from './Container'

export type Props = {
  headerTitle?: string
  headerLink?: string
}

export const Header: React.FC<Props> = ({ headerTitle, headerLink }) => (
  <Box as="footer">
    <Container py={6}>
      <Flex align="center">
        <Heading as="h1" size="md">
          <Flex align="center" gap="4">
            <Link href="/" boxSize="1.5em">
              <Image src="/icon.png" alt="icon" />
            </Link>
            {headerTitle && (
              <Link href={headerLink} color="black">
                <Text>{headerTitle}</Text>
              </Link>
            )}
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
