import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/work/ecolink",
        destination: "/work/ecolynk",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
