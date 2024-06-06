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
  const maxLength = 100

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
      py={4}
      px={6}
      gap={6}
    >
      {ogp.image && (
        <Image
          src={ogp.image}
          alt="Link preview image"
          height="100%"
          maxW="250px"
          maxH="200px"
          objectFit="cover"
        />
      )}
      <Box flex="1">
        <Text fontSize="md" fontWeight="bold">
          {ogp.title}
        </Text>
        <Text fontSize="sm" color="gray.600">
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
