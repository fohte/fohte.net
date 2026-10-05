# AGENTS.md

## Code organization rules

### Split files before they grow past ~500 lines of production code

When a change would push a file's non-test code past ~500 lines, split it along responsibility seams before adding more. Splits must be move-only commits: no logic changes, renames, or reformatting mixed in. Keep external import paths unchanged by keeping the entrypoint file in place and re-exporting the pieces you split out into new files (e.g. `index.ts` re-exports from the new files). Tests move together with the code they verify.

Prefer creating a new focused file over appending to the largest existing one.

### テストや story のためだけに export しない

テストや story は、production のコードと同じ公開 API を通して対象を使う。内部の関数・定数・型をテストのためだけに export しない。単体でテストしたいロジックは別モジュールに切り出して production もそこから import し、story で描画する View は container とは別のファイルに置く。

`knip --production` がこの違反を検出する。指摘を `@internal` / `@public` タグや knip の `ignore` 系の設定で隠さない。

## Error handling rules

### Return a `Result` instead of throwing

`errorHandling` in `eslint.config.js` bans `throw`/`try-catch` in production code and requires every returned `Result` to be consumed (`no-restricted-syntax`, `neverthrow/must-use-result` in `@fohte/eslint-config`). Return a `Result`/`ResultAsync` from [neverthrow](https://github.com/supermacro/neverthrow) instead (add it as a dependency first if this package doesn't have it yet):

```ts
// bad: throws
function parseConfig(raw: string): Config {
  if (!isValid(raw)) throw new Error('invalid config')
  return JSON.parse(raw)
}

// good: returns a Result
function parseConfig(raw: string): Result<Config, ConfigError> {
  if (!isValid(raw)) return err(new ConfigError('invalid config'))
  return ok(JSON.parse(raw))
}
```

Use `ResultAsync.fromPromise()` or `Result.fromThrowable()` to interop with a throwing API without a local try/catch. If the throw-based contract genuinely can't be wrapped that way, define a package-local base error and subclass it for the boundary:

```ts
abstract class BoundaryError extends Error {
  constructor(message: string, cause: unknown) {
    super(message, { cause })
    this.name = new.target.name
  }
}

class DataSourceBoundaryError extends BoundaryError {}
```

When `error_tracking` or `is_web_app` is enabled, call `captureWithFingerprint` from `@fohte/service-kit/observability` immediately before rethrowing to give the error a stable Sentry fingerprint.

Catch the exception, wrap it in the boundary-specific subclass, and rethrow it — `no-restricted-syntax` bans `try`/`throw` as separate selectors, so both the `try` and the `throw` need their own `eslint-disable-next-line no-restricted-syntax` comment explaining why.

## Visual Regression Testing (VRT)

### Understand why the `vrt` check fails

The `vrt` CI check runs the repository's `vrt:capture` script, which must write screenshots to `__screenshots__/fohte-net`, and compares them against the `main` baseline with reg-suit. A failure ("Visual differences detected") means the pixel diff exceeded reg-suit's `matchingThreshold`, not that something is broken — open the reg-suit report link posted on the PR and compare the actual/expected/diff images to judge whether the change is intentional.

### Never add the `vrt-approved` label yourself

The `vrt-approval` workflow treats the `vrt-approved` label as confirmation that a human reviewed the diff images and approved them. Only a human can make that visual judgment, so after inspecting the diff, ask the user to review it and add the label themselves — do not add it yourself even if the diff looks correct.

## Test code rules

### Assert on the whole output with a single equality check

Treat each test as a spec: build the expected output as one literal value (object, struct, JSON, array, etc.) and compare it to the actual output with a single equality assertion. Do not split the assertion into per-field checks, and do not use partial matchers (substring contains, `toContain`, `toMatchObject`, prefix/suffix checks, regex-on-substring, etc.). Partial matches silently ignore unexpected fields and extra elements, so the test stops working as a spec the moment the shape of the output changes.

```ts
// bad: picks fields one by one — silent on any new/changed field
const ev = run()
expect(ev.path).toBe('/a')
expect(ev.event).toBe('ok')
expect(ev.message).toContain('done')

// good: one literal, one equality — any drift in shape fails the test
expect(run()).toEqual({
  path: '/a',
  event: 'ok',
  message: 'done',
})
```

For dynamic fields (timestamps, UUIDs, random IDs), normalize them in a helper before the comparison (e.g. replace with a fixed placeholder) so the full output can still be asserted in one equality check. Do not weaken the assertion to dodge the dynamic value.
