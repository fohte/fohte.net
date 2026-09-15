import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
<<<<<<< before updating
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    exclude: ['**/tests/e2e/**', '**/node_modules/**'],
    passWithNoTests: true,
||||||| last update
  })
=======
    // Spelled out (matching Vitest's own default) so knip's static analysis
    // of this file can resolve test entry files; Vitest's own runtime
    // behavior is unchanged.
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
>>>>>>> after updating
  },})
