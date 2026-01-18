import type * as React from 'react'

type YouTubeProps = {
  videoId: string
}

export const YouTube: React.FC<YouTubeProps> = ({ videoId }) => (
  <div className="relative h-0 w-full overflow-hidden pb-[56.25%]">
    <iframe
      className="absolute left-0 top-0 h-full w-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
)
