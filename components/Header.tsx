import Link from 'next/link'
import { Box, Text, Heading, Image, Flex } from '@chakra-ui/react'

import { Container } from '../components/Container'

export const Header: React.FC = () => (
  <Box as="footer">
    <Container py={6}>
      <Heading as="h1" size="md">
        <Link href="/">
          <a>
            <Flex align="center">
              <Image
                src="/icon.png"
                alt="icon"
                boxSize="1.5em"
                display="inline"
                mr="1rem"
              />
              <Text textTransform="uppercase">Fohte Blog</Text>
            </Flex>
          </a>
        </Link>
      </Heading>
    </Container>
  </Box>
)
