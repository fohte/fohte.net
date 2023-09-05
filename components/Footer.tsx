import * as React from 'react'

import { Image, Flex, Box, Text } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { FooterSocialList } from './FooterSocialList'

interface Props {
  showSocial?: boolean
}

const Copyright: React.FC = () => <Text textAlign="center">© 2020 Fohte</Text>

const Profile: React.FC = () => (
  <Flex alignItems="center">
    <Image
      src="/icon.png"
      alt="icon"
      boxSize="4em"
      display="inline"
      mr="1rem"
    />
    <Box>
      <Text color="gray.700">Fohte</Text>
    </Box>
  </Flex>
)

export const Footer: React.FC<Props> = ({ showSocial }) => (
  <Box as="footer" color="gray.500" fontSize="sm">
    <Container py={6}>
      {showSocial && (
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          flex="1"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Box mx={8}>
            <Profile />
          </Box>
          <Box mx={8} mt={{ base: 4, md: 0 }}>
            <FooterSocialList />
          </Box>
        </Flex>
      )}
      <Box mt={6}>
        <Copyright />
      </Box>
    </Container>
  </Box>
)
