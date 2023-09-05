import * as React from 'react'

import { Box, Heading, Text, Flex } from '@chakra-ui/react'

import { Container } from '../components/Container'
import GlobalLayout from '../components/GlobalLayout'
import { FooterSocialList } from '../components/FooterSocialList'

interface Props {}

const RootPage: React.FC<Props> = () => (
  <GlobalLayout>
    <Container margin="auto">
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Box>
          <Heading>Fohte (Hayato Kawai)</Heading>
          <Text>Software Engineer / Cloud Infrastructure Engineer</Text>
          <FooterSocialList />
        </Box>
      </Flex>
    </Container>
  </GlobalLayout>
)

export default RootPage
