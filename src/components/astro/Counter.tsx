import { Slot } from '@radix-ui/react-slot'
import { useState } from 'react'

interface CounterProps {
  initial?: number
}

export function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial)

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100">
      <Slot>
        <span className="text-2xl font-bold">{count}</span>
      </Slot>
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => setCount((c) => c - 1)}
      >
        -
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </button>
    </div>
  )
}
