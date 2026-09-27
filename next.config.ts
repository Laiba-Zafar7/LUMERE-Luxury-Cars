import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (typically 20–40% smaller than WebP at the same quality), WebP fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
