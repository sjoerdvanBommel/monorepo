import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

/**
 * @type {import('next').NextConfig}
 */
export default {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common', 'encoding')
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
  reactStrictMode: true,
}
