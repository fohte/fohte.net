import { Box, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react'

import { Container } from './Container'
import { Link } from './Link'

export const Header: React.FC = () => (
  <Box as="footer">
    <Container py={6}>
      <Flex align="center">
        <Heading as="h1" size="md">
          <Flex align="center" gap="4">
            <Link href="/" boxSize="1.5em">
              <Image src="/icon.png" alt="icon" />
            </Link>
            <Link href="/" color="black">
              <Text>fohte.net</Text>
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
