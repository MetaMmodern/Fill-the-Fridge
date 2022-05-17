/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.povarenok.ru']
  },
  experimental: {
    images: {
      layoutRaw: true
    }
  },
}

module.exports = nextConfig
