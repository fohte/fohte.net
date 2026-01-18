'use client'

import type * as React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

type TweetProps = React.ComponentProps<typeof TwitterTweetEmbed>

export const Tweet: React.FC<TweetProps> = (props) => (
  <TwitterTweetEmbed {...props} />
)
