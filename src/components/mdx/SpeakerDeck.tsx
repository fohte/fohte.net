'use client'

import type * as React from 'react'

type SpeakerDeckProps = {
  id: string
}

export const SpeakerDeck: React.FC<SpeakerDeckProps> = ({ id }) => (
  <div className="my-8">
    <iframe
      className="m-0 aspect-video h-auto w-full rounded-[6px] border-0 bg-black/10 bg-clip-padding bg-origin-padding p-0 shadow-[0_5px_40px_rgb(0_0_0/0.2)]"
      src={`https://speakerdeck.com/player/${id}`}
      allowFullScreen
      data-ratio="1.7777777777777777"
    />
  </div>
)
