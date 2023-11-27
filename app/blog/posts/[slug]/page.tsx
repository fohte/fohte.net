import * as React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ParsedUrlQuery } from 'node:querystring'
import { mdxComponents } from '../../../../components/mdx'
import { Heading, Text, Box } from '@chakra-ui/react'

import { TagList } from '../../../../components/TagList'
import { Container } from '../../../../components/Container'
import { formatDate } from '../../../../utils/date'

type Props = {
  params: Params
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export async function generateMetadata(
  { params: { slug } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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
  }
  return metadata
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }))
}

export default function PostPage({ params: { slug } }: Props) {
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) notFound()
  const MDXContent = useMDXComponent(post.body.code)

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
        <MDXContent components={mdxComponents} />
      </Box>
    </Container>
  )
}
