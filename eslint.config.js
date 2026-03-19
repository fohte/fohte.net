import { mainConfig, typescriptConfig } from '@fohte/eslint-config'

const config = [
  ...mainConfig,
  ...typescriptConfig,
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
]

export default config
