'use client'

import { Grid } from '@chakra-ui/react'
import * as React from 'react'

type ImageGridProps = {
  children: React.ReactNode
}

export const ImageGrid: React.FC<ImageGridProps> = ({ children }) => {
  const childCount = React.Children.count(children)

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        sm: `repeat(${childCount}, 1fr)`,
      }}
      alignItems="center"
      gap={4}
      mt={4}
      sx={{
        '& > figure': {
          mt: 0,
        },
      }}
    >
      {children}
    </Grid>
  )
}
