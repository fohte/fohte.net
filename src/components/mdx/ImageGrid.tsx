import type * as React from 'react'

type ImageGridProps = {
  children: React.ReactNode
}

export const ImageGrid: React.FC<ImageGridProps> = ({ children }) => {
  return (
    <div className="mt-4 grid auto-cols-fr grid-flow-col items-center gap-4 [&>figure]:mt-0">
      {children}
    </div>
  )
}
