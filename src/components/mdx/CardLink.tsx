'use client'

import { Box, Image, Text } from '@chakra-ui/react'

import { type LinkProps } from '@/components/Link'
import ogpData from '@/data/ogp.json'

export interface Props extends LinkProps {
  href: string
}

type OgpData = {
  [url: string]: {
    title?: string | null
    description?: string | null
    image?: string | null
  }
}

const collapseDescription = (description: string): string => {
  const maxLength = 80

  const newDescription = description.substring(0, maxLength)
  if (description !== newDescription) {
    return `${newDescription}…`
  }
  return newDescription
}

export const CardLink: React.FC<Props> = ({ href }) => {
  const ogp = (ogpData as OgpData)[href]

  if (ogp == null) {
    throw new Error(`OGP not found: ${href}`)
  }

  const domain = new URL(href).hostname

  return (
    <Box
      as="a"
      href={href}
      borderWidth="1px"
      borderColor="gray.200"
      rounded="md"
      overflow="hidden"
      textDecoration="none"
      display="flex"
      alignItems="center"
      justifyContent="center"
      my={4}
      py={4}
      px={4}
      gap={6}
    >
      {ogp.image && (
        <Box
          minW="min(20%, 150px)"
          maxW="min(40%, 250px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={ogp.image}
            alt="Link preview image"
            height="100%"
            maxH="200px"
            objectFit="cover"
          />
        </Box>
      )}
      <Box flex="1">
        <Text fontSize="sm" fontWeight="bold">
          {ogp.title}
        </Text>
        <Text fontSize="xs" color="gray.600">
          {domain}
        </Text>
        {ogp.description && (
          <Text fontSize="xs" color="gray.600" mt={1}>
            {collapseDescription(ogp.description)}
          </Text>
        )}
      </Box>
    </Box>
  )
}
