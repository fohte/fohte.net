import { expect, test } from '@playwright/test'

test.describe('Blog meta titles', () => {
  test('blog listing page should have correct title', async ({ page }) => {
    await page.goto('/blog')
    await expect(page).toHaveTitle('記事一覧 | Fohte Blog')
  })

  test('blog post page should have correct title format', async ({ page }) => {
    await page.goto('/blog/posts/vrt-test-basic')
    await expect(page).toHaveTitle('VRT Test - Basic | Fohte Blog')
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
    await page.goto('/blog')
    const headerTitle = page.locator('header').locator('text=Fohte Blog')
    await expect(headerTitle).toBeVisible()
  })

  test('non-blog pages should show "fohte.net" in header', async ({ page }) => {
    await page.goto('/')
    const headerTitle = page.locator('header').locator('text=fohte.net')
    await expect(headerTitle).toBeVisible()
  })
})
