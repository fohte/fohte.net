import type * as React from 'react'

type ImageGridProps = {
  children: React.ReactNode
}

export const ImageGrid: React.FC<ImageGridProps> = ({ children }) => {
  return (
    <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:auto-cols-fr sm:grid-flow-col [&>figure]:mt-0">
      {children}
    </div>
  )
}
