// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
}

console.log('[DEBUG] cloudflare pages env', {
  CF_PAGES: process.env.CF_PAGES,
  CF_PAGES_COMMIT_SHA: process.env.CF_PAGES_COMMIT_SHA,
  CF_PAGES_BRANCH: process.env.CF_PAGES_BRANCH,
  CF_PAGES_URL: process.env.CF_PAGES_URL,
  NODE_ENV: process.env.NODE_ENV,
})

module.exports = withContentlayer(nextConfig)
