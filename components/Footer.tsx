import { Box, Text } from '@chakra-ui/react'
import * as React from 'react'

import { Container } from '@/components/Container'

interface Props {}

const Copyright: React.FC = () => <Text textAlign="center">© 2020 Fohte</Text>

export const Footer: React.FC<Props> = () => (
  <Box as="footer" color="gray.500" fontSize="sm">
    <Container py={6}>
      <Box mt={6}>
        <Copyright />
      </Box>
    </Container>
  </Box>
)
