import createMDX from '@next/mdx'
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'
import rehypeHighlight from 'rehype-highlight'

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
  reactStrictMode: true,
  eslint: {
    dirs: ['app', 'backend', 'components', 'lib', 'providers'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mr-ss-bucket-staging.s3.eu-west-2.amazonaws.com',
        port: '',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withMDX(config)
