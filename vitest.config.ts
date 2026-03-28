import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // @ts-expect-error -- vite 6 (astro) vs vite 7 (vitest) Plugin type mismatch; resolved in astro 6 upgrade
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    exclude: ['**/tests/e2e/**', '**/node_modules/**'],
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
