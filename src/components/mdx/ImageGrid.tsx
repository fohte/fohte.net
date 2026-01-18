'use client'

import * as React from 'react'

type ImageGridProps = {
  children: React.ReactNode
}

export const ImageGrid: React.FC<ImageGridProps> = ({ children }) => {
  const childCount = React.Children.count(children)

  return (
    <div
      className="mt-4 grid items-center gap-4 [&>figure]:mt-0"
      style={{
        gridTemplateColumns: `repeat(1, 1fr)`,
      }}
      data-child-count={childCount}
    >
      <style>{`
        @media (min-width: 640px) {
          [data-child-count="${childCount}"] {
            grid-template-columns: repeat(${childCount}, 1fr);
          }
        }
      `}</style>
      {children}
    </div>
  )
}
