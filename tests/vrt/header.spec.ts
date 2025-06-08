import { expect, test } from '@playwright/test'

test.describe('Header titles', () => {
  test('blog pages should show "Fohte Blog" in header', async ({ page }) => {
    await page.goto('/test/blog')
    const headerTitle = page
      .locator('header')
      .first()
      .locator('text=Fohte Blog')
    await expect(headerTitle).toBeVisible()
  })

  test('non-blog pages should show "fohte.net" in header', async ({ page }) => {
    await page.goto('/')
    const headerTitle = page.locator('header').first().locator('text=fohte.net')
    await expect(headerTitle).toBeVisible()
  })
})
