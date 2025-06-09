import { expect, test } from '@playwright/test'

test.describe('Blog Page Metadata', () => {
  test('blog listing page should have correct title', async ({ page }) => {
    await page.goto('/blog')
    await expect(page).toHaveTitle('記事一覧 | Fohte Blog')

    // Also check meta tags
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute('content')
    expect(ogTitle).toBe('記事一覧 | Fohte Blog')
  })

  test('blog tag page should have correct title format', async ({ page }) => {
    // Navigate to a real tag page
    await page.goto('/blog')
    const firstTag = page.locator('a[href^="/blog/tags/"]').first()
    const tagHref = await firstTag.getAttribute('href')
    const tagName = tagHref?.split('/').pop()

    if (tagHref) {
      await firstTag.click()
      await expect(page).toHaveTitle(new RegExp(`^#${tagName} \\| Fohte Blog$`))
    }
  })

  test('blog post page should have correct title format', async ({ page }) => {
    // Navigate to a real blog post
    await page.goto('/blog')
    const firstPost = page.locator('article a').first()
    const postTitle = await firstPost.textContent()

    await firstPost.click()
    await expect(page).toHaveTitle(
      new RegExp(`${postTitle?.trim()} \\| Fohte Blog$`),
    )
  })

  test('non-blog pages should use root template', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('fohte.net')

    await page.goto('/projects')
    await expect(page).toHaveTitle('fohte.net')
  })
})

test.describe('Test Blog Metadata', () => {
  test('test blog page should have correct title', async ({ page }) => {
    await page.goto('/test/blog')
    await expect(page).toHaveTitle('記事一覧 | Fohte Blog')
  })
})
