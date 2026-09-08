import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Other lockfiles live higher up in C:\Workspace — pin the root to this app.
  outputFileTracingRoot: dir,
};

export default nextConfig;
