/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CODESPACE_NAME: process.env.CODESPACE_NAME,
  },
}

module.exports = nextConfig

