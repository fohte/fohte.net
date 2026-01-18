'use client'

import type * as React from 'react'
import { useEffect, useRef } from 'react'

type Props = {
  url: string
}

export const Mastodon: React.FC<Props> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    const src = `${url}/embed`
    if (iframe == null) return
    iframe.src = src

    const script = document.createElement('script')
    // e.g. https://social.fohte.net/@fohte/123456789 -> https://social.fohte.net/embed.js
    script.src = new URL('/embed.js', url).toString()
    script.async = true

    if (!document.head.contains(script)) {
      document.head.appendChild(script)
    }
  }, [url])

  return (
    <div className="my-2 flex justify-center">
      <iframe
        ref={iframeRef}
        className="mastodon-embed"
        style={{
          maxWidth: '100%',
          border: 0,
        }}
        width="500"
        allowFullScreen
      />
    </div>
  )
}
