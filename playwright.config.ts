import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/vrt',
  outputDir: './test-results',

  // Visual regression testing specific settings
  use: {
    // Base URL for the application
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot settings
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
  },

  // Configure projects for different browsers/viewports
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1200, height: 800 },
      },
    },
    {
      name: 'chromium-mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 667 },
      },
    },
  ],

  // Run local dev server before starting the tests
  webServer: {
    command: 'NODE_ENV=test bun run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    env: {
      NODE_ENV: 'test',
    },
  },

  // Retry failed tests
  retries: process.env.CI ? 2 : 0,

  // Reporter configuration
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
})
