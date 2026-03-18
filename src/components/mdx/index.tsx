import type { MDXComponents } from 'mdx/types'
import type * as React from 'react'

import { CardLink } from '@/components/mdx/CardLink'
import { CodeBlock } from '@/components/mdx/CodeBlock'
import { DocsHeading } from '@/components/mdx/DocsHeading'
import { Image } from '@/components/mdx/Image'
import { ImageGrid } from '@/components/mdx/ImageGrid'
import { Kbd } from '@/components/mdx/Kbd'
import { Link } from '@/components/mdx/Link'
import { SpeakerDeck } from '@/components/mdx/SpeakerDeck'

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-8 mb-6 border-b border-[var(--color-border)] pb-2 text-2xl leading-normal"
      {...props}
    />
  ),
  h2: (props) => (
    <DocsHeading as="h2" className="text-xl font-bold" {...props} />
  ),
  h3: (props) => (
    <DocsHeading as="h3" className="mb-2 text-lg font-bold" {...props} />
  ),
  h4: (props) => (
    <DocsHeading as="h4" className="mb-2 text-base font-bold" {...props} />
  ),
  code: (props) => {
    if (/language-/.test(props.className || '')) {
      return <CodeBlock {...props} />
    }

    return (
      <code
        className="rounded bg-[var(--color-bg-tertiary)] px-[0.4em] py-[0.1em] text-[0.85em]"
        {...props}
      />
    )
  },
  hr: (props) => (
    <hr className="my-8 border-t border-[var(--color-border)]" {...props} />
  ),
  a: Link,
  CardLink: CardLink,
  p: (props) => <p className="mt-4" {...props} />,
  ul: (props) => (
    <ul className="mt-4 ml-2 list-disc pl-4 [&_ul]:mt-1" {...props} />
  ),
  ol: (props) => <ol className="mt-4 ml-2 list-decimal pl-4" {...props} />,
  li: (props) => <li className="pb-1" {...props} />,
  table: (props) => (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border-collapse border border-[var(--color-border)]"
        {...props}
      />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-[var(--color-bg-secondary)]" {...props} />
  ),
  tbody: (props) => <tbody {...props} />,
  tr: (props) => (
    <tr className="border-b border-[var(--color-border)]" {...props} />
  ),
  th: (props) => (
    <th
      className="border border-[var(--color-border)] px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-[var(--color-border)] px-4 py-2" {...props} />
  ),
  img: Image,
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-[3px] border-[var(--color-accent)] bg-[var(--color-bg-secondary)] p-4 italic"
      {...props}
    />
  ),

  Kbd,
  SpeakerDeck,
  ImageGrid,
}

// RSS feed components (simplified versions for RSS output)
export const rssComponents: MDXComponents = {
  Kbd: 'kbd',
  SpeakerDeck: () => <p>SpeakerDeck</p>,
  CardLink: ({ href }: { href: string }) => <a href={href}>{href}</a>,
  ImageGrid: ({ children }: { children: React.ReactNode }) => (
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
export { SpeakerDeck } from '@/components/mdx/SpeakerDeck'
