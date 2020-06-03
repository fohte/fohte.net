import * as React from 'react'

import { Components } from '@mdx-js/react'
import { Box, Code, Divider, Heading, Text } from '@chakra-ui/core'

import { CodeBlock } from './CodeBlock'
import { Link } from '../Link'
import { DocsHeading } from './DocsHeading'
import { List } from './List'

export const mdxComponents: Components = {
  h1: (props) => (
    <Heading
      as="h1"
      size="lg"
      mt={8}
      mb={6}
      lineHeight="base"
      pb={2}
      borderBottom="1px solid #ddd"
      {...props}
    ></Heading>
  ),
  h2: (props) => (
    <DocsHeading
      as="h2"
      fontWeight="semibold"
      size="md"
      {...props}
    ></DocsHeading>
  ),
  h3: (props) => (
    <DocsHeading as="h3" size="sm" mb="0.5em" {...props}></DocsHeading>
  ),
  inlineCode: (props) => (
    <Code
      variantColor="gray"
      fontSize="0.85em"
      paddingX="0.4em"
      paddingY="0.1em"
      {...props}
    />
  ),
  code: (props) => <CodeBlock {...props} />,
  br: (props) => <Box height="1em" {...props} />,
  hr: Divider,
  a: Link,
  p: (props) => <Text as="p" mt={4} lineHeight="tall" {...props} />,
  ul: (props) => <List as="ul" {...props} />,
  ol: (props) => <Box as="ol" mt="1rem" pl={4} ml={2} {...props} />,
  li: (props) => <Box as="li" pb={1} {...props} />,
}
