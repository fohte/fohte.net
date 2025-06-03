import { expect, test } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test('VRT test page - full page', async ({ page }) => {
    await page.goto('/test/vrt')

    // Wait for fonts and animations to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Take full page screenshot
    await expect(page).toHaveScreenshot('vrt-test-page-full.png', {
      fullPage: true,
      animations: 'disabled',
      // Allow 5% pixel difference threshold
      threshold: 0.05,
    })
  })

  test('VRT test page - components', async ({ page }) => {
    await page.goto('/test/vrt')
    await page.waitForLoadState('networkidle')

    // Typography section
    const typography = page.locator('section').first()
    await expect(typography).toHaveScreenshot('vrt-typography.png')

    // Buttons section
    const buttons = page.locator('section').nth(1)
    await expect(buttons).toHaveScreenshot('vrt-buttons.png')

    // Cards section
    const cards = page.locator('section').nth(2)
    await expect(cards).toHaveScreenshot('vrt-cards.png')

    // Form section
    const form = page.locator('section').nth(3)
    await expect(form).toHaveScreenshot('vrt-form.png')
  })

  test('VRT test page - interactions', async ({ page }) => {
    await page.goto('/test/vrt')
    await page.waitForLoadState('networkidle')

    // Hover state on primary button
    const primaryButton = page.getByRole('button', { name: 'Primary Button' })
    await primaryButton.hover()
    await expect(primaryButton).toHaveScreenshot('vrt-button-hover.png')

    // Focus state on input
    const textInput = page.getByPlaceholder('Enter some text')
    await textInput.focus()
    await expect(textInput).toHaveScreenshot('vrt-input-focus.png')

    // Checked state on checkbox
    const checkbox = page.getByRole('checkbox')
    await checkbox.check()
    await expect(checkbox.locator('..').first()).toHaveScreenshot(
      'vrt-checkbox-checked.png',
    )
  })

  test('Home page visual regression', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.05,
    })
  })

  test('Blog page visual regression', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('blog-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.05,
    })
  })

  test('Projects page visual regression', async ({ page }) => {
    await page.goto('/projects')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('projects-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.05,
    })
  })
})
