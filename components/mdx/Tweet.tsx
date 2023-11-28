// use client component instead of server component to avoid
// `TypeError: r(...).useRef is not a function` error
'use client'

import { TwitterTweetEmbed } from 'react-twitter-embed'

export const Tweet = TwitterTweetEmbed
