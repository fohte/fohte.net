// Wrap a caught external error before re-throwing, so it carries a
// domain-meaningful message while preserving the original via `cause`.
// Subclass per interop boundary — `name` is derived automatically, so no
// constructor override is needed. The try and the throw this requires each
// need their own eslint-disable-next-line comment, since @fohte/eslint-config's
// errorHandling bans ThrowStatement and TryStatement as separate selectors:
//
//   export class TaskStorePersistenceError extends BoundaryError {}
//
//   // eslint-disable-next-line no-restricted-syntax -- interop boundary
//   try {
//     ...
//   } catch (caughtErr) {
//     const wrapped = new TaskStorePersistenceError('failed to save', caughtErr)
//     // eslint-disable-next-line no-restricted-syntax -- interop boundary
//     throw wrapped
//   }
//
// To report a wrapped error under a stable fingerprint (for Sentry
// grouping) without changing control flow, call `captureWithFingerprint`
// (from `@fohte/service-kit/observability`, see src/bootstrap.ts — only
// generated when `error_tracking` or `is_web_app` is enabled) right before
// re-throwing.
export abstract class BoundaryError extends Error {
  constructor(message: string, cause: unknown) {
    super(message, { cause })
    this.name = new.target.name
  }
}
