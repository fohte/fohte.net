'use client'

import type * as React from 'react'
import { useEffect, useState } from 'react'

type YouTubeProps = {
  videoId: string
}

export const YouTube: React.FC<YouTubeProps> = ({ videoId }) => {
  const [YouTubePlayer, setYouTubePlayer] =
    useState<
      React.ComponentType<{ videoId: string; iframeClassName?: string }>
    >()

  useEffect(() => {
    import('react-youtube').then((mod) => {
      setYouTubePlayer(() => mod.default)
    })
  }, [])

  if (!YouTubePlayer) {
    return (
      <div className="relative h-0 w-full overflow-hidden pb-[56.25%]">
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-100">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-0 w-full overflow-hidden pb-[56.25%]">
      <YouTubePlayer
        videoId={videoId}
        iframeClassName="absolute top-0 left-0 h-full w-full"
      />
    </div>
  )
}
