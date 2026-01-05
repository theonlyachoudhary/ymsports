import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:5000')

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
    process.env.REPLIT_DEV_DOMAIN,
    '.replit.dev',
    '.riker.replit.dev',
    '.kirk.replit.dev',
    '.janeway.replit.dev',
    '.picard.replit.dev',
  ].filter(Boolean),
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
