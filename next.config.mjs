/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Keep it simple and bundle-friendly
  },
};

export default nextConfig;
