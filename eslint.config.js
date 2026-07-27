import { config } from '@fohte/eslint-config'

export default config(
  {
    ignores: ['dist/**/*', '.astro/**/*'],
  },
  {
    // .cjs files use CommonJS, so require() is the correct module system
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    typescript: { typeChecked: true },
    errorHandling: {},
  },
)
