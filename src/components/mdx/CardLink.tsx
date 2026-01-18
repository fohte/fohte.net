'use client'

import type * as React from 'react'

import ogpData from '@/data/ogp.json'

export interface CardLinkProps {
  href: string
  children?: React.ReactNode
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

export const CardLink: React.FC<CardLinkProps> = ({ href }) => {
  const ogp = (ogpData as OgpData)[href]

  if (ogp == null) {
    throw new Error(`OGP not found: ${href}`)
  }

  const domain = new URL(href).hostname

  return (
    <a
      href={href}
      className="my-4 flex items-center justify-center gap-6 overflow-hidden rounded-md border border-gray-200 px-4 py-4 no-underline"
    >
      {ogp.image && (
        <div className="flex min-w-[min(20%,150px)] max-w-[min(40%,250px)] items-center justify-center">
          <img
            src={ogp.image}
            alt="Link preview image"
            className="h-full max-h-[200px] object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <p className="text-[15px] font-bold">{ogp.title}</p>
        <p className="text-sm text-gray-600">{domain}</p>
        {ogp.description && (
          <p className="mt-1 text-xs text-gray-600">
            {collapseDescription(ogp.description)}
          </p>
        )}
      </div>
    </a>
  )
}
