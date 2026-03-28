import { config } from '@fohte/eslint-config'

export default config(
  { typescript: { typeChecked: true } },
  {
    ignores: ['dist/**/*', '.astro/**/*'],
  },
  {
    files: [
      'scripts/fetch-ogp.ts',
      'src/pages/og/\\[slug\\].png.ts',
      'vitest.config.ts',
    ],
    rules: {
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message:
                'Please use absolute imports instead of relative imports.',
            },
          ],
        },
      ],
    },
  },
)
