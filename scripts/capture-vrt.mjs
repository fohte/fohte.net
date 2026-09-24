import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:4321'
const screenshotsDirectory = path.resolve('__screenshots__/fohte-net')
const pages = [
  { name: 'home', path: '/' },
  { name: 'blog', path: '/blog' },
  { name: 'tag-visual-regression', path: '/blog/tags/visual-regression' },
  { name: 'article-components', path: '/blog/posts/vrt-components' },
  { name: 'article-japanese', path: '/blog/posts/vrt-japanese' },
  { name: 'article-long-title', path: '/blog/posts/vrt-long-title' },
  { name: 'article-minimal', path: '/blog/posts/vrt-minimal' },
]
const themes = ['light', 'dark']
const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

let previewProcess
let browser

async function waitForPreview() {
  const deadline = Date.now() + 60_000

  while (Date.now() < deadline) {
    if (
      previewProcess.exitCode !== null ||
      previewProcess.signalCode !== null
    ) {
      return Promise.reject(
        new Error('Astro preview exited before it was ready.'),
      )
    }

    const response = await fetch(baseUrl).catch(() => null)
    if (response?.ok) return

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return Promise.reject(new Error('Timed out waiting for Astro preview.'))
}

async function captureScreenshots() {
  await mkdir(screenshotsDirectory, { recursive: true })

  previewProcess = spawn(
    'pnpm',
    ['exec', 'astro', 'preview', '--host', '127.0.0.1', '--port', '4321'],
    { stdio: 'inherit', env: process.env },
  )
  await waitForPreview()

  browser = await chromium.launch({ headless: true })

  for (const theme of themes) {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        colorScheme: theme,
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
        timezoneId: 'UTC',
        viewport: { width: viewport.width, height: viewport.height },
      })
      await context.route('https://fixture.invalid/**', (route) =>
        route.fulfill({
          contentType: 'image/svg+xml',
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="#e7e5e4"/><circle cx="92" cy="90" r="46" fill="#ef4444"/><path d="M145 128 205 48l55 80z" fill="#292524"/></svg>',
        }),
      )
      await context.route('https://www.googletagmanager.com/**', (route) =>
        route.abort(),
      )

      const page = await context.newPage()
      for (const entry of pages) {
        const response = await page.goto(`${baseUrl}${entry.path}`, {
          waitUntil: 'networkidle',
        })
        if (response == null || !response.ok()) {
          return Promise.reject(
            new Error(
              `Failed to load ${entry.path}: ${String(response?.status())}`,
            ),
          )
        }

        await page.evaluate(async () => {
          await document.fonts.ready
        })
        await page.screenshot({
          path: path.join(
            screenshotsDirectory,
            `${entry.name}-${theme}-${viewport.name}.png`,
          ),
          fullPage: true,
          animations: 'disabled',
        })
      }

      await context.close()
    }
  }
}

await captureScreenshots()
  .finally(() => {
    previewProcess?.kill()
    return browser?.close()
  })
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
