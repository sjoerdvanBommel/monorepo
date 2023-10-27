import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

/**
 * @type {import('next').NextConfig}
 */
const config = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common', 'encoding')
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['app', 'backend', 'components', 'lib', 'providers'],
  },
}

export default config
