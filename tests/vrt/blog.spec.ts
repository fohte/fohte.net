import { expect, test } from '@playwright/test'

test.describe('Blog Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for fonts to load
    await page.waitForLoadState('networkidle')
  })

  test('Blog list page', async ({ page }) => {
    await page.goto('/blog')

    // Wait for content to be fully loaded
    await page.waitForTimeout(1000)

    // Take full page screenshot
    await expect(page).toHaveScreenshot('blog-list.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.05,
    })
  })

  test('Blog post - Basic', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-basic')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('blog-post-basic.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.05,
    })
  })

  test('Blog post - Long title', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-long-title')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('blog-post-long-title.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.05,
    })
  })

  test('Blog post - Japanese content', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-japanese')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('blog-post-japanese.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.05,
    })
  })

  test('Blog post - Minimal', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-minimal')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('blog-post-minimal.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.05,
    })
  })

  // Test specific components within blog posts
  test('Blog post components', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-basic')
    await page.waitForTimeout(1000)

    // Test code block rendering
    const codeBlock = page.locator('pre').first()
    await expect(codeBlock).toHaveScreenshot('blog-code-block.png')

    // Test post header (title, date, tags)
    const header = page
      .locator('div')
      .filter({ hasText: 'VRT Test Post' })
      .first()
      .locator('..')
    await expect(header).toHaveScreenshot('blog-post-header.png')
  })
})
