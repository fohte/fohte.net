import { Box, Flex, Image, Text } from '@chakra-ui/react'

import { SocialList } from '@/components/SocialList'

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

export const PostFooterProfile: React.FC = () => {
  return (
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
  )
}
