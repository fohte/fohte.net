import * as React from 'react'

import NextImage from 'next/image'
import { MDXComponents } from 'mdx/types'
import { Box, Code, Divider, Heading, Text } from '@chakra-ui/react'
import YouTube from 'react-youtube'
import { css } from '@emotion/react'

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
  hr: Divider,
  a: Link,
  p: (props) => <Text as="p" mt={4} {...props} />,

  // FIXME: fix any type
  ul: (props: any) => <List as="ul" {...props} />,

  // FIXME: fix any type
  ol: (props: any) => <Box as="ol" mt="1rem" pl={4} ml={2} {...props} />,

  // FIXME: fix any type
  li: (props: any) => <Box as="li" pb={1} {...props} />,

  Image: (props: any) => {
    const { caption, ...imageProps } = props
    return (
      <Box as="figure" mt={4}>
        <Box
          css={css`
            & > span {
              position: unset !important;
            }
            img {
              position: relative !important;
              height: unset !important;
            }
          `}
        >
          <NextImage layout="fill" {...imageProps} />
        </Box>
        <Box
          as="figcaption"
          css={css`
            text-align: center;
            color: var(--chakra-colors-gray-600);
            margin-top: 0.5em;
            font-size: 0.9rem;
          `}
        >
          {caption}
        </Box>
      </Box>
    )
  },

  YouTube: (props: any) => {
    return (
      <Box
        css={css`
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;

          & iframe {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        `}
      >
        <YouTube {...props} />
      </Box>
    )
  },
}
