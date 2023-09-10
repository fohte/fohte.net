import * as React from 'react'

import { Box, Heading, Text, Flex, List, ListItem } from '@chakra-ui/react'

import { Container } from '../components/Container'
import GlobalLayout from '../components/GlobalLayout'
import { Link } from '../components/Link'
import { socialList } from '../utils/socialList'

interface Props {}

const RootPage: React.FC<Props> = () => (
  <GlobalLayout>
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
            Mastodon: @fohte@social.fohte.net
            <br />
            Twitter: @fohte@social.fohte.net
            <br />
            Twitter: @fohte@social.fohte.net
            <List>
              {socialList.map((social) => (
                <ListItem key={social.href} mt={1}>
                  <Link
                    href={social.href}
                    color="gray.700"
                    {...social.linkProps}
                  >
                    <Box as={social.icon} display="inline" mr={2} />
                    {social.text}
                  </Link>
                </ListItem>
              ))}
            </List>
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
  </GlobalLayout>
)

export default RootPage
