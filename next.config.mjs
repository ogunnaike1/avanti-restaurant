import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Other lockfiles live higher up in C:\Workspace — pin the root to this app.
  outputFileTracingRoot: dir,
  images: {
    // WebP only: AVIF is smaller, but encoding it on the first request is slow, and
    // that first request is what a visitor waits on for the hero photographs.
    formats: ["image/webp"],
    // Optimised variants are immutable in practice — keep them cached for a month.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
