'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import * as React from 'react'

import { mdxComponents } from '@/components/mdx'

type Props = {
  code: string
}

export function MDXContent({ code }: Props) {
  const Component = useMDXComponent(code)
  return <Component components={mdxComponents} />
}
