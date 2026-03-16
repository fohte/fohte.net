import type * as React from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface DocsHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
}

export const DocsHeading: React.FC<DocsHeadingProps> = ({
  as: Component = 'h2',
  id,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'scroll-mt-24 mt-[1.5em] group [&[id]]:pointer-events-none [&[id]_>_*]:pointer-events-auto'
  // mb-[1em] is the default; callers can override via className (e.g. mb-2)
  const defaultMb = className.includes('mb-') ? '' : 'mb-[1em]'

  return (
    <Component
      id={id}
      className={[baseStyles, defaultMb, className].filter(Boolean).join(' ')}
      {...props}
    >
      <span>
        {children}
        {id && (
          <a
            href={`#${id}`}
            aria-label={`Link to ${id} section`}
            className="ml-1.5 font-normal text-blue-500 opacity-0 transition-opacity outline-none group-hover:opacity-100 focus:opacity-100"
          >
            #
          </a>
        )}
      </span>
    </Component>
  )
}
