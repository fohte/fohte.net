import * as React from 'react'

import { MDXComponents } from 'mdx/types'
import {
  Box,
  Code,
  Divider,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Kbd,
} from '@chakra-ui/react'

import { CodeBlock } from './CodeBlock'
import { ImgurImage } from './ImgurImage'
import { Link } from '../Link'
import { DocsHeading } from './DocsHeading'
import { List } from './List'
import { YouTube } from './YouTube'
import { Tweet } from './Tweet'

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
    <DocsHeading as="h3" fontSize="lg" mb="0.5em" {...props}></DocsHeading>
  ),
  h4: (props) => (
    <DocsHeading as="h4" fontSize="md" mb="0.5em" {...props}></DocsHeading>
  ),
  code: (props) => {
    if (/language-/.test(props.className || '')) {
      return <CodeBlock {...props} />
    }

    return (
      <Code
        colorScheme="gray"
        fontSize="0.85em"
        paddingX="0.4em"
        paddingY="0.1em"
        {...props}
      />
    )
  },
  hr: (props) => <Divider mt={8} mb={8} {...props} />,
  a: Link,
  p: (props) => <Text as="p" mt={4} {...props} />,

  // FIXME: fix any type
  ul: (props: any) => <List as="ul" {...props} />,

  // FIXME: fix any type
  ol: (props: any) => <Box as="ol" mt="1rem" pl={4} ml={2} {...props} />,

  // FIXME: fix any type
  li: (props: any) => <Box as="li" pb={1} {...props} />,

  table: (props) => (
    <Box overflowX="auto">
      <Table {...props} />
    </Box>
  ),
  thead: (props) => <Thead {...props} />,
  tbody: (props) => <Tbody {...props} />,
  tr: (props) => <Tr {...props} />,
  th: (props) => <Th {...props} />,
  td: (props) => <Td {...props} />,

  Kbd: (props) => <Kbd fontWeight="normal" {...props} />,

  Tweet: Tweet,
  ImgurImage: ImgurImage,
  YouTube: YouTube,
}
