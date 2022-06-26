/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'scontent-iad3-1.xx.fbcdn.net',
      'platform-lookaside.fbsbx.com',
      'i.scdn.co',
      '/favicon.ico',
    ],
  },
};

module.exports = nextConfig;
