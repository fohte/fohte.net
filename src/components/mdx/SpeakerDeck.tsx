'use client'

import * as React from 'react'

type SpeakerDeckProps = {
  id: string
}

export const SpeakerDeck: React.FC<SpeakerDeckProps> = ({ id }) => (
  <iframe
    className="speakerdeck-iframe"
    src={`https://speakerdeck.com/player/${id}`}
    allowFullScreen
    style={{
      border: '0px',
      background: 'padding-box padding-box rgba(0, 0, 0, 0.1)',
      margin: '0px',
      padding: '0px',
      borderRadius: '6px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 40px',
      width: '100%',
      height: 'auto',
      aspectRatio: '560 / 315',
    }}
    data-ratio="1.7777777777777777"
  />
)
