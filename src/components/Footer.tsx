import { Box, Text } from '@chakra-ui/react'
import * as React from 'react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'

interface Props {}

const Copyright: React.FC = () => <Text textAlign="center">© 2020 Fohte</Text>

export const Footer: React.FC<Props> = () => (
  <Box as="footer" color="gray.500" fontSize="sm">
    <Container py={6}>
      <Box
        mt={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={8}
      >
        <Box>
          <Copyright />
        </Box>
        <Box>
          <Link href="/privacy-policy" color="gray.500">
            Privacy Policy
          </Link>
        </Box>
      </Box>
    </Container>
  </Box>
)
