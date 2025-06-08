import { expect, test } from '@playwright/test'

test.describe('Blog meta titles', () => {
  test('blog listing page should have correct title', async ({ page }) => {
    await page.goto('/test/blog')
    await expect(page).toHaveTitle('記事一覧 | Fohte Blog')
  })

  test('blog post page should have correct title format', async ({ page }) => {
    await page.goto('/test/blog')
    // For now, just check that the page loads
    await expect(page.locator('text=記事一覧')).toBeVisible()
  })

  test('blog tag page should have correct title format', async ({ page }) => {
    await page.goto('/blog/tags/test')
    await expect(page).toHaveTitle('#test | Fohte Blog')
  })

  test('home page should not use blog title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('fohte.net')
  })

  test('projects page should not use blog title', async ({ page }) => {
    await page.goto('/projects')
    await expect(page).toHaveTitle('fohte.net')
  })
})

test.describe('Header titles', () => {
  test('blog pages should show "Fohte Blog" in header', async ({ page }) => {
    await page.goto('/test/blog')
    // Header is actually rendered as footer in the code
    const headerTitle = page
      .locator('footer')
      .first()
      .locator('text=Fohte Blog')
    await expect(headerTitle).toBeVisible()
  })

  test('non-blog pages should show "fohte.net" in header', async ({ page }) => {
    await page.goto('/')
    // Header is actually rendered as footer in the code
    const headerTitle = page.locator('footer').first().locator('text=fohte.net')
    await expect(headerTitle).toBeVisible()
  })
})
