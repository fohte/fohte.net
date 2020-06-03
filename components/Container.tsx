import { PseudoBox, PseudoBoxProps } from '@chakra-ui/core'

export const Container: React.FC<PseudoBoxProps> = ({
  children,
  ...boxProps
}) => (
  <PseudoBox
    maxW={{ base: '780px' }}
    mx="auto"
    px={{ base: 4, sm: 6, md: 8 }}
    py={4}
    {...boxProps}
  >
    {children}
  </PseudoBox>
)
