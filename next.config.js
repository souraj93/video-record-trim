/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'cdn.britannica.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: '3.bp.blogspot.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'roodsappbucket.s3.eu-central-1.amazonaws.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist'],
  experimental: {
    serverComponentsExternalPackages: ['@mapbox/mapbox-sdk']
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Match all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
