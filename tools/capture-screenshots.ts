import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(__dirname, '..', '.reg', 'actual')
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Define the pages to capture
  const pages = [
    { name: 'home', path: '/', viewport: { width: 1200, height: 800 } },
    { name: 'blog', path: '/blog', viewport: { width: 1200, height: 800 } },
    {
      name: 'projects',
      path: '/projects',
      viewport: { width: 1200, height: 800 },
    },
    { name: 'home-mobile', path: '/', viewport: { width: 375, height: 667 } },
    {
      name: 'blog-mobile',
      path: '/blog',
      viewport: { width: 375, height: 667 },
    },
  ]

  const baseUrl = process.env.VRT_BASE_URL || 'http://localhost:3000'

  for (const pageConfig of pages) {
    console.log(`Capturing screenshot for: ${pageConfig.name}`)

    await page.setViewport(pageConfig.viewport)
    await page.goto(`${baseUrl}${pageConfig.path}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // Wait for fonts and images to load
    await page.waitForTimeout(2000)

    const screenshotPath = path.join(screenshotsDir, `${pageConfig.name}.png`)
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      type: 'png',
    })

    console.log(`Screenshot saved: ${screenshotPath}`)
  }

  await browser.close()
  console.log('All screenshots captured successfully!')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  captureScreenshots().catch(console.error)
}

export default captureScreenshots
