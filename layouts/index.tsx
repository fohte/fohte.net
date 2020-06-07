import * as React from 'react'

import { MDXProvider } from '@mdx-js/react'
import { Heading, Text, Box } from '@chakra-ui/core'

import Layout from '../components/Layout'
import { TagList } from '../components/TagList'
import { Container } from '../components/Container'
import { mdxComponents } from '../components/mdx'
import { FrontMatter } from '../utils/types'
import { formatDate } from '../utils/date'

export default (frontMatter: FrontMatter) => {
  const { date, title, tags } = frontMatter

  const MDXLayout: React.FC = ({ children }) => {
    return (
      <MDXProvider components={mdxComponents}>
        <Layout title={title}>
          <Container backgroundColor="white" py={8}>
            <Box mb={8}>
              <Text fontSize="xs" mb={2}>
                {formatDate(date)}
              </Text>
              <Heading as="h1" mb={{ base: 2, md: 3 }} size="lg">
                {frontMatter.title}
              </Heading>
              {tags && (
                <Box>
                  <TagList tags={tags}></TagList>
                </Box>
              )}
            </Box>
            <Box fontSize={{ base: 'sm', md: 'md' }} lineHeight="taller">
              {children}
            </Box>
          </Container>
        </Layout>
      </MDXProvider>
    )
  }

  return MDXLayout
}
