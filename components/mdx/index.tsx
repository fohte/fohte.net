import * as React from 'react'

import { MDXComponents } from 'mdx/types'
import { Box, Code, Divider, Heading, Text } from '@chakra-ui/react'

import { CodeBlock } from './CodeBlock'
import { Link } from '../Link'
import { DocsHeading } from './DocsHeading'
import { List } from './List'

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <Heading
      as="h1"
      fontSize="2xl"
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
      fontSize="xl"
      {...props}
    ></DocsHeading>
  ),
  h3: (props) => (
    <DocsHeading as="h3" fontSize="md" mb="0.5em" {...props}></DocsHeading>
  ),
  code: (props) => (
    <Code
      colorScheme="gray"
      fontSize="0.85em"
      paddingX="0.4em"
      paddingY="0.1em"
      {...props}
    />
  ),
  pre: (props) => <CodeBlock {...props} />,
  hr: Divider,
  a: Link,
  p: (props) => <Text as="p" mt={4} {...props} />,

  // FIXME: fix any type
  ul: (props: any) => <List as="ul" {...props} />,

  // FIXME: fix any type
  ol: (props: any) => <Box as="ol" mt="1rem" pl={4} ml={2} {...props} />,

  // FIXME: fix any type
  li: (props: any) => <Box as="li" pb={1} {...props} />,
}
