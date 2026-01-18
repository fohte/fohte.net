import { Slot } from '@radix-ui/react-slot'
import { useState } from 'react'

interface CounterProps {
  initial?: number
}

export function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial)

  return (
    <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4">
      <Slot>
        <span className="text-2xl font-bold">{count}</span>
      </Slot>
      <button
        type="button"
        className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        onClick={() => setCount((c) => c - 1)}
      >
        -
      </button>
      <button
        type="button"
        className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </button>
    </div>
  )
}
