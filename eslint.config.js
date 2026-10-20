import { config } from '@fohte/eslint-config'

const srcTypeScriptFiles = ['src/**/*.ts{,x}']

export default config(
  {
    typescript: { typeChecked: true },
    errorHandling: {},
    shadcn: {
      files: srcTypeScriptFiles,
      rootDir: import.meta.dirname,
    },
    noRawFormElements: {
      files: srcTypeScriptFiles,
    },
  },
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
)
