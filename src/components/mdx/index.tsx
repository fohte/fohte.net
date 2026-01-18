import type { MDXComponents } from 'mdx/types'
import type * as React from 'react'

import { CardLink } from '@/components/mdx/CardLink'
import { CodeBlock } from '@/components/mdx/CodeBlock'
import { DocsHeading } from '@/components/mdx/DocsHeading'
import { Image } from '@/components/mdx/Image'
import { ImageGrid } from '@/components/mdx/ImageGrid'
import { Kbd } from '@/components/mdx/Kbd'
import { Link } from '@/components/mdx/Link'
import { Mastodon } from '@/components/mdx/Mastodon'
import { SpeakerDeck } from '@/components/mdx/SpeakerDeck'
import { Tweet } from '@/components/mdx/Tweet'
import { YouTube } from '@/components/mdx/YouTube'

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-8 mb-6 border-b border-gray-300 pb-2 text-2xl leading-normal"
      {...props}
    />
  ),
  h2: (props) => (
    <DocsHeading as="h2" className="text-xl font-semibold" {...props} />
  ),
  h3: (props) => <DocsHeading as="h3" className="mb-2 text-lg" {...props} />,
  h4: (props) => <DocsHeading as="h4" className="mb-2 text-base" {...props} />,
  code: (props) => {
    if (/language-/.test(props.className || '')) {
      return <CodeBlock {...props} />
    }

    return (
      <code
        className="rounded bg-gray-100 px-[0.4em] py-[0.1em] text-[0.85em]"
        {...props}
      />
    )
  },
  hr: (props) => <hr className="my-8" {...props} />,
  a: Link,
  CardLink: CardLink,
  p: (props) => <p className="mt-4" {...props} />,
  ul: (props) => <ul className="mt-4 ml-2 pl-4 [&_ul]:mt-1" {...props} />,
  ol: (props) => <ol className="mt-4 ml-2 pl-4" {...props} />,
  li: (props) => <li className="pb-1" {...props} />,
  table: (props) => (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border-collapse border border-gray-300"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-gray-50" {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="border-b border-gray-300" {...props} />,
  th: (props) => (
    <th
      className="border border-gray-300 px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => <td className="border border-gray-300 px-4 py-2" {...props} />,
  img: Image,
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-700"
      {...props}
    />
  ),

  Kbd,
  Tweet,
  YouTube,
  SpeakerDeck,
  Mastodon,
  ImageGrid,
}

// RSS feed components (simplified versions for RSS output)
export const rssComponents: MDXComponents = {
  Kbd: 'kbd',
  Tweet: ({}: React.ComponentProps<typeof Tweet>) => <div>Tweet</div>,
  YouTube: ({}: React.ComponentProps<typeof YouTube>) => <div>YouTube</div>,
  SpeakerDeck: ({}: React.ComponentProps<typeof SpeakerDeck>) => (
    <p>SpeakerDeck</p>
  ),
  Mastodon: ({ url }: React.ComponentProps<typeof Mastodon>) => (
    <p>
      Mastodon: <a href={url}>{url}</a>
    </p>
  ),
  CardLink: ({ href }: React.ComponentProps<typeof CardLink>) => (
    <a href={href}>{href}</a>
  ),
  ImageGrid: ({ children }: React.ComponentProps<typeof ImageGrid>) => (
    <div>{children}</div>
  ),
}

// Re-export components for direct import
export { CardLink } from '@/components/mdx/CardLink'
export { CodeBlock } from '@/components/mdx/CodeBlock'
export { DocsHeading } from '@/components/mdx/DocsHeading'
export { Image } from '@/components/mdx/Image'
export { ImageGrid } from '@/components/mdx/ImageGrid'
export { Kbd } from '@/components/mdx/Kbd'
export { Link } from '@/components/mdx/Link'
export { Mastodon } from '@/components/mdx/Mastodon'
export { SpeakerDeck } from '@/components/mdx/SpeakerDeck'
export { Tweet } from '@/components/mdx/Tweet'
export { YouTube } from '@/components/mdx/YouTube'
