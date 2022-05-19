import * as React from 'react'

import { Image, Flex, Box, Text, List, ListItem } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { FaTwitter, FaGithub } from 'react-icons/fa'

import { Container } from '../components/Container'
import { Link } from '../components/Link'

const Copyright: React.FC = () => (
  <Text textAlign="center">
    © 2020 <Link href="https://fohte.net">Fohte</Link>
  </Text>
)

interface IconProps {
  icon: IconType
  href: string
  children: React.ReactNode
}

const SocialLink: React.FC<IconProps> = ({ icon, href, children }) => (
  <>
    <Link href={href} color="gray.500">
      <Box as={icon} display="inline" mr={2} />
      {children}
    </Link>
  </>
)

const socialList: Array<IconProps> = [
  {
    icon: FaTwitter,
    href: 'https://twitter.com/fohte',
    children: 'fohte',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/fohte',
    children: 'fohte',
  },
]

const SocialList: React.FC = () => (
  <List>
    {socialList.map((social) => (
      <ListItem key={social.href} mt={1}>
        <SocialLink icon={social.icon} href={social.href}>
          {social.children}
        </SocialLink>
      </ListItem>
    ))}
  </List>
)

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

export const Footer: React.FC = () => (
  <Box as="footer" color="gray.500" fontSize="sm">
    <Container py={6}>
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
          <SocialList />
        </Box>
      </Flex>
      <Box mt={6}>
        <Copyright />
      </Box>
    </Container>
  </Box>
)
