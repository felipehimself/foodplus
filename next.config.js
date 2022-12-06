/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com'
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sauces',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
