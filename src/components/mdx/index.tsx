import {
  Box,
  Code,
  Divider,
  Heading,
  Kbd,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { MDXComponents } from 'mdx/types'
import * as React from 'react'

import { Link } from '@/components/Link'
import { CardLink } from '@/components/mdx/CardLink'
import { CodeBlock } from '@/components/mdx/CodeBlock'
import { DocsHeading } from '@/components/mdx/DocsHeading'
import { Image } from '@/components/mdx/Image'
import { List } from '@/components/mdx/List'
import { Mastodon } from '@/components/mdx/Mastodon'
import { SpeakerDeck } from '@/components/mdx/SpeakerDeck'
import { Tweet } from '@/components/mdx/Tweet'
import { YouTube } from '@/components/mdx/YouTube'

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
  CardLink: CardLink,
  p: (props) => <Text as="p" mt={4} {...props} />,

  // FIXME: fix any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ul: (props: any) => <List as="ul" {...props} />,

  // FIXME: fix any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ol: (props: any) => <Box as="ol" mt="1rem" pl={4} ml={2} {...props} />,

  // FIXME: fix any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  img: Image,

  Kbd: (props) => <Kbd fontWeight="normal" {...props} />,

  Tweet: Tweet,
  YouTube: YouTube,
  SpeakerDeck: SpeakerDeck,
  Mastodon: Mastodon,
}

export const rssComponents: MDXComponents = {
  Kbd: 'kbd',

  // FIXME: fix mock of Tweet and YouTube
  Tweet: ({}: React.ComponentProps<typeof Tweet>) => <div>Tweet</div>,
  YouTube: ({}: React.ComponentProps<typeof YouTube>) => <div>YouTube</div>,

  // FIxME: fix mock of SpeakerDeck, the id in props is not a url to view the slide page
  SpeakerDeck: ({}: React.ComponentProps<typeof SpeakerDeck>) => (
    <p>SpeakerDeck</p>
  ),

  Mastodon: ({ url }: React.ComponentProps<typeof Mastodon>) => (
    <p>
      Mastodon: <a>{url}</a>
    </p>
  ),

  CardLink: ({ href, children }: React.ComponentProps<typeof CardLink>) => (
    <a href={href}>{children}</a>
  ),
}
