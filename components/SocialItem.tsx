'use client'

import * as React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'
import { Link } from './Link'
import { type SocialLinkItem } from '../utils/socialList'

export interface SocialItemProps extends BoxProps {
  social: SocialLinkItem
}

export const SocialItem: React.FC<SocialItemProps> = ({
  social,
  ...boxProps
}) => (
  <Link href={social.href} color="gray.500" {...social.linkProps}>
    <Box as={social.icon} display="inline" mr={2} {...boxProps} />
    {social.text}
  </Link>
)
