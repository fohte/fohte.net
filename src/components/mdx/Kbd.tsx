import type * as React from 'react'

type KbdProps = React.HTMLAttributes<HTMLElement>

export const Kbd: React.FC<KbdProps> = ({ children, ...props }) => (
  <kbd
    className="rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-1.5 py-0.5 font-[family-name:var(--font-mono-ui)] text-sm font-normal"
    {...props}
  >
    {children}
  </kbd>
)
