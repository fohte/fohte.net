import { promises as fs } from 'fs'
import { JSDOM } from 'jsdom'

const files = await fs.readdir('./src/contents/posts')

const urls = (
  await Promise.all(
    files.map(async (file) => {
      // extract urls from CardLink components
      const content = await fs.readFile(`./src/contents/posts/${file}`, 'utf-8')

      const regex = /<CardLink href="(.+)"/g
      const matches = content.matchAll(regex)

      return Array.from(matches, (match) => match[1])
    }),
  )
).flat()

console.log(urls)

type Data = {
  [url: string]: {
    title?: string | null
    description?: string | null
    image?: string | null
  }
}

const fetchOgp = async (url: string): Promise<Data[string]> => {
  const res = await fetch(url)
  const html = await res.text()
  const dom = new JSDOM(html)

  const data = {
    title: dom.window.document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute('content'),
    description: dom.window.document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute('content'),
    image: dom.window.document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute('content'),
  }

  if (data.title == null) {
    data.title = dom.window.document.querySelector('title')?.textContent
  }

  if (data.image == null) {
    // if amazon
    if (res.url.startsWith('https://www.amazon.co.jp/')) {
      const asin = res.url.match(/dp\/(\w+)/)?.[1]
      if (asin == null) {
        throw new Error(`ASIN not found: ${res.url}`)
      }

      data.image = `https://images.amazon.com/images/P/${asin}.09_SL110_.jpg`
    } else {
      // favicon
      data.image = dom.window.document
        .querySelector('link[rel="icon"]')
        ?.getAttribute('href')
    }
  }

  return data
}

const json: Data = JSON.parse(await fs.readFile('./src/data/ogp.json', 'utf-8'))

for (const url of urls) {
  if (json[url] != null) {
    continue
  }

  console.log(`fetching ${url}...`)
  const data = await fetchOgp(url)

  json[url] = data
  fs.writeFile('./src/data/ogp.json', JSON.stringify(json, null, 2) + '\n')

  console.log(`fetched ${url}`)

  // sleep
  await new Promise((resolve) => setTimeout(resolve, 1000))
}
