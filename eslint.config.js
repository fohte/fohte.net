import { FlatCompat } from '@eslint/eslintrc'
import { mainConfig, typescriptConfig } from '@fohte/eslint-config'

const compat = new FlatCompat()

const config = [
  ...compat.extends('next/core-web-vitals'),
  ...mainConfig,
  ...typescriptConfig,
  {
    ignores: [
      // ignore build files
      'out/**/*',
      '.next/**/*',
      '.contentlayer/**/*',
    ],
  },
]

export default config
