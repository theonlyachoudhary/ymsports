import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const resolveServerUrl = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  if (serverUrl && !serverUrl.includes('${')) {
    return serverUrl
  }
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:5000'
}

const NEXT_PUBLIC_SERVER_URL = resolveServerUrl()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
      {
        hostname: '**',
        protocol: 'http',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : 'http://localhost:5000',
    '*.replit.dev',
    '*.riker.replit.dev',
  ].filter(Boolean),
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
