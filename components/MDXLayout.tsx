import * as React from 'react'

import { Heading, Text, Box } from '@chakra-ui/react'
import Head from 'next/head'

import GlobalLayout from './GlobalLayout'
import { TagList } from '../components/TagList'
import { Container } from '../components/Container'
import { type PostFrontmatter } from '../utils/contentlayer'
import { formatDate } from '../utils/date'

export interface MDXLayoutProps {
  frontMatter: PostFrontmatter
  children: React.ReactNode
}

export const MDXLayout: React.FC<MDXLayoutProps> = ({
  children,
  frontMatter: { title, date, tags, description, imagePath },
}) => (
  <GlobalLayout
    title={title}
    headerTitle="Fohte Blog"
    ogImage={
      imagePath == null
        ? undefined
        : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${imagePath}`
    }
    showSocial
  >
    <Head>
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </>
      )}

      <meta property="og:type" content="article" />
    </Head>

    <Container backgroundColor="white" py={8}>
      <Box mb={8}>
        <Text fontSize="sm" mb={2}>
          {formatDate(date)}
        </Text>
        <Heading as="h1" mb={{ base: 2, md: 3 }} size="lg">
          {title}
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
  </GlobalLayout>
)
