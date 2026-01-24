import type * as React from 'react'

type KbdProps = React.HTMLAttributes<HTMLElement>

export const Kbd: React.FC<KbdProps> = ({ children, ...props }) => (
  <kbd
    className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-sm font-normal"
    {...props}
  >
    {children}
  </kbd>
)
