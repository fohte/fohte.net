import { Box, Heading, HeadingProps } from '@chakra-ui/react'

export const DocsHeading: React.FC<HeadingProps> = (props) => (
  <Heading
    css={{
      scrollMarginTop: '100px',
      scrollSnapMargin: '100px', // Safari
      '&[id]': {
        pointerEvents: 'none',
      },
      '&[id]:before': {
        display: 'block',
        height: ' 6rem',
        marginTop: '-6rem',
        visibility: 'hidden',
        content: `""`,
      },
      '&[id]:hover a': { opacity: 1 },
    }}
    mb="1em"
    mt="1.5em"
    {...props}
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <Box
          aria-label="anchor"
          color="blue.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: 'outline',
          }}
          opacity={0}
          ml="0.375rem"
        >
          <a href={`#${props.id}`}>#</a>
        </Box>
      )}
    </Box>
  </Heading>
)
