import { ParsedUrlQuery } from 'node:querystring'

import { Box, Divider, Heading, Text } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import * as React from 'react'

import { Container } from '@/components/Container'
import { MDXContent } from '@/components/MDXContent'
import { PostFooterProfile } from '@/components/PostFooterProfile'
import { TagList } from '@/components/TagList'
import { formatDate } from '@/utils/date'

type Props = {
  params: Promise<Params>
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) throw new Error(`Failed to find post with slug: ${slug}`)
  const metadata: Metadata = {
    title: post.title,
    description: post.description,
    openGraph: {
      description: post.description,
      type: 'article',
      images: post.imagePath
        ? [{ url: post.imagePath }]
        : (await parent).openGraph?.images,
    },
    other: {
      'fediverse:creator': '@fohte@social.fohte.net',
    },
  }
  return metadata
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }))
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) notFound()

  return (
    <Container backgroundColor="white" py={8}>
      <Box mb={8}>
        <Text fontSize="sm" mb={2}>
          {formatDate(post.date)}
        </Text>
        <Heading as="h1" mb={{ base: 2, md: 3 }} size="lg">
          {post.title}
        </Heading>
        {post.tags && (
          <Box>
            <TagList tags={post.tags}></TagList>
          </Box>
        )}
      </Box>
      <Box fontSize={{ base: 'sm', md: 'md' }} lineHeight="taller">
        <MDXContent code={post.body.code} />
      </Box>
      <Divider my={8} />
      <PostFooterProfile />
    </Container>
  )
}
