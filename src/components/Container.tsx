import { Box, BoxProps } from '@chakra-ui/react'

export const Container: React.FC<BoxProps> = ({ children, ...boxProps }) => (
  <Box
    maxW={{ base: '780px' }}
    mx="auto"
    px={{ base: 4, sm: 6, md: 8 }}
    py={4}
    {...boxProps}
  >
    {children}
  </Box>
)
