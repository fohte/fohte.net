'use client'

import { Box, Image, Link, Text } from '@chakra-ui/react'

import { type LinkProps } from '@/components/Link'
import ogpData from '@/data/ogp.json'

export interface Props extends LinkProps {
  href: string
}

interface Ogp {
  title: string | null
  description: string | null
  image: string | null
}

interface OgpData {
  [url: string]: Ogp
}

export const CardLink: React.FC<Props> = ({ href }) => {
  const ogp = (ogpData as unknown as OgpData)[href]

  if (ogp == null) {
    throw new Error(`OGP not found: ${href}`)
  }

  const domain = new URL(href).hostname

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      textDecoration="none"
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        borderWidth="1px"
        borderColor="gray.200"
        rounded="md"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={6}
        py={4}
        gap={4}
        mt={4}
        transition="all 0.2s"
        _hover={{
          borderColor: 'gray.300',
          backgroundColor: 'gray.50',
        }}
      >
        <Box flex="1">
          <Text fontSize="lg" fontWeight="bold" mb={1}>
            {ogp.title}
          </Text>
          <Text fontSize="sm" color="gray.600" lineClamp={2} mb={1}>
            {ogp.description}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {domain}
          </Text>
        </Box>
        {ogp.image && (
          <Box flexShrink="0">
            <Image
              src={ogp.image}
              alt={ogp.title || ''}
              width="100px"
              height="100px"
              objectFit="cover"
              rounded="md"
            />
          </Box>
        )}
      </Box>
    </Link>
  )
}
