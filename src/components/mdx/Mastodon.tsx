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

    // e.g. https://social.fohte.net/@fohte/123456789 -> https://social.fohte.net/embed.js
    const scriptSrc = new URL('/embed.js', url).toString()
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`)
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = scriptSrc
      script.async = true
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
