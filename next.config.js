// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    // Disable ESLint during builds due to Next.js 15 compatibility issues
    ignoreDuringBuilds: true,
  },
}

module.exports = withContentlayer(nextConfig)
