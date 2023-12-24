import { mainConfig, typescriptConfig } from '@fohte/eslint-config'

import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
  ...compat.extends('next/core-web-vitals'),
  ...mainConfig,
  ...typescriptConfig,
  {
    ignores: ['out/**/*', '.next/**/*', '.contentlayer/**/*']
  }
]
