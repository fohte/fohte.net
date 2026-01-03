import { mainConfig, typescriptConfig } from '@fohte/eslint-config'

const config = [
  ...mainConfig,
  ...typescriptConfig,
  {
    ignores: ['dist/**/*', '.astro/**/*'],
  },
  {
    rules: { 'no-restricted-imports': ['error', { patterns: ['./', '../'] }] },
  },
]

export default config
