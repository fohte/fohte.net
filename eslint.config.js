import { config } from '@fohte/eslint-config'

export default config(
  { typescript: { typeChecked: true } },
  {
    ignores: ['dist/**/*', '.astro/**/*'],
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
