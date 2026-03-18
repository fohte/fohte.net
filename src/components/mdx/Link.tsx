import type * as React from 'react'

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const isInternalLink = (href: string): boolean => {
  // External links start with a protocol (http:, https:) or protocol-relative scheme (//)
  return !/^(https?:)?\/\//.test(href)
}

export const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  if (!href) {
    return <a {...props}>{children}</a>
  }

  const isExternal = !isInternalLink(href)

  return (
    <a
      href={href}
      className="break-all text-[var(--color-accent)] no-underline hover:underline"
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {children}
    </a>
  )
}
