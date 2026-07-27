import { describe, expect, it } from 'vitest'

import { BoundaryError } from '#errors'

class TaskStorePersistenceError extends BoundaryError {}

describe('BoundaryError', () => {
  it('derives name from the subclass and preserves the original error as cause', () => {
    const original = new Error('connection refused')

    const wrapped = new TaskStorePersistenceError('failed to save', original)

    expect(wrapped.name).toBe('TaskStorePersistenceError')
    expect(wrapped.message).toBe('failed to save')
    expect(wrapped.cause).toBe(original)
  })
})
