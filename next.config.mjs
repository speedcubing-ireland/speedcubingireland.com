/** @type {import('next').NextConfig} */
import mdx from '@next/mdx';

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['cdn.shopify.com'],
  },
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [{
        source: '/fmc-europe-24',
        destination: 'https://buy.stripe.com/28o2albL3gAX5Ve9AF',
        permanent: true,
    }]
  }
};

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig);
