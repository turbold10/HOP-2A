import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HF_API_KEY: process.env.HF_API_KEY ?? '',
    BACKEND_URL: process.env.BACKEND_URL ?? 'http://localhost:5555'
  }
};

export default nextConfig;
