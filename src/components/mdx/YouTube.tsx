import type * as React from 'react'

// Note: This component only accepts videoId prop.
// The previous react-youtube implementation supported additional props like
// opts, onReady, onPlay, onPause, onEnd, onError, onStateChange, onPlaybackRateChange,
// onPlaybackQualityChange. These are not supported in this simplified iframe implementation.
// If those features are needed, consider re-introducing react-youtube or implementing
// the YouTube IFrame API directly.
type YouTubeProps = {
  videoId: string
}

export const YouTube: React.FC<YouTubeProps> = ({ videoId }) => (
  <div className="relative h-0 w-full overflow-hidden pb-[56.25%]">
    <iframe
      className="absolute top-0 left-0 h-full w-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
)
