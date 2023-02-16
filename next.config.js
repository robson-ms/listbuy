/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'github.com'],
  },
  async redirects() {
    return [
      {
        source: '/singout',
        destination: '/login',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
