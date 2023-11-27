import * as React from 'react'

import { Box, Heading, Text, Flex } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { Link } from '../components/Link'
import { SocialList } from '../components/SocialList'

interface Props {}

const RootPage: React.FC<Props> = () => (
  <Container>
    <Flex justifyContent="center" flexDirection="column" gap={10}>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={4}
      >
        <Heading>Fohte (Hayato Kawai)</Heading>
        <Text>Gamer / Software Engineer (Cloud Infrastructure Engineer)</Text>
        <Text>Love: Rhythm Games, Productivity, Neovim, Dvorak</Text>
      </Flex>
      <Flex flexDirection="column" gap={8}>
        <Box as="section">
          <Heading size="md" pb={2} mb={4} borderBottom="1px solid #ddd">
            Socials
          </Heading>
          <SocialList />
        </Box>
        <Box as="section">
          <Heading size="md" pb={2} mb={4} borderBottom="1px solid #ddd">
            Career
          </Heading>
          <Text>
            See:{' '}
            <Link href="https://www.wantedly.com/id/fohte">
              wantedly.com/id/fohte
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  </Container>
)

export default RootPage
