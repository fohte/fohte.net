import percySnapshot from '@percy/playwright'
import { test } from '@playwright/test'

test.describe('Blog E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for fonts to load
    await page.waitForLoadState('networkidle')
  })

  test('Blog list page', async ({ page }) => {
    await page.goto('/test/blog')

    // Wait for content to be fully loaded
    await page.waitForTimeout(1000)

    // Take Percy snapshot
    await percySnapshot(page, 'Blog list page')
  })

  test('Blog post - Basic', async ({ page }) => {
    await page.goto('/blog/posts/e2e-test-basic')
    await page.waitForTimeout(1000)

    await percySnapshot(page, 'Blog post - Basic')
  })

  test('Blog post - Long title', async ({ page }) => {
    await page.goto('/blog/posts/e2e-test-long-title')
    await page.waitForTimeout(1000)

    await percySnapshot(page, 'Blog post - Long title')
  })

  test('Blog post - Japanese content', async ({ page }) => {
    await page.goto('/blog/posts/e2e-test-japanese')
    await page.waitForTimeout(1000)

    await percySnapshot(page, 'Blog post - Japanese content')
  })

  test('Blog post - Minimal', async ({ page }) => {
    await page.goto('/blog/posts/e2e-test-minimal')
    await page.waitForTimeout(1000)

    await percySnapshot(page, 'Blog post - Minimal')
  })
})
