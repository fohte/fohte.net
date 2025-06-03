import { type Page, test } from '@playwright/test'

// Percy snapshot helper - no-op when running locally without Percy token
const takeSnapshot = async (
  page: Page,
  name: string,
  options: { fullPage?: boolean } = {},
) => {
  if (process.env.PERCY_TOKEN) {
    const percySnapshot = await import('@percy/playwright')
    await percySnapshot.default(page, name, options)
  } else {
    // Local mode - just verify page loads without taking screenshots
    console.log(`Would take Percy snapshot: ${name}`)
  }
}

test.describe('Blog Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for fonts to load
    await page.waitForLoadState('networkidle')
  })

  test('Blog list page', async ({ page }) => {
    await page.goto('/test/blog')

    // Wait for content to be fully loaded
    await page.waitForTimeout(1000)

    // Take Percy snapshot
    await takeSnapshot(page, 'Blog list page', {
      fullPage: true,
    })
  })

  test('Blog post - Basic', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-basic')
    await page.waitForTimeout(1000)

    await takeSnapshot(page, 'Blog post - Basic', {
      fullPage: true,
    })
  })

  test('Blog post - Long title', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-long-title')
    await page.waitForTimeout(1000)

    await takeSnapshot(page, 'Blog post - Long title', {
      fullPage: true,
    })
  })

  test('Blog post - Japanese content', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-japanese')
    await page.waitForTimeout(1000)

    await takeSnapshot(page, 'Blog post - Japanese content', {
      fullPage: true,
    })
  })

  test('Blog post - Minimal', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-minimal')
    await page.waitForTimeout(1000)

    await takeSnapshot(page, 'Blog post - Minimal', {
      fullPage: true,
    })
  })
})
