import type { NextConfig } from "next";
import { SECURITY_HEADERS } from "./src/lib/security/headers";
import { wixRedirects } from "./src/lib/seo/wix-redirects";

const noStore = [{ key: "Cache-Control", value: "private, no-store, max-age=0" }];

function serverActionOrigins(): string[] {
  const hosts = new Set<string>(["cohen-law.co.il", "www.cohen-law.co.il"]);
  if (process.env.NODE_ENV !== "production") hosts.add("localhost:3000");
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) {
    try {
      hosts.add(new URL(site).host);
    } catch {
      /* ignore bad env at build */
    }
  }
  // Preview deployments need their own host; production accepts only the canonical domain.
  if (process.env.VERCEL_URL && process.env.VERCEL_ENV !== "production") hosts.add(process.env.VERCEL_URL);
  return [...hosts];
}

const nextConfig: NextConfig = {
  turbopack: { root: import.meta.dirname },
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    // No remote CMS images yet — keep allowlist empty (local /public only).
    remotePatterns: [],
  },
  experimental: {
    agentUpgrade: "security",
    serverActions: {
      bodySizeLimit: "64kb",
      allowedOrigins: serverActionOrigins(),
    },
  },
  async headers() {
    return [
      { source: "/:path*", headers: [...SECURITY_HEADERS] },
      { source: "/thank-you", headers: noStore },
      { source: "/api/health", headers: noStore },
      { source: "/api/csp-report", headers: noStore },
      { source: "/.well-known/security.txt", headers: noStore },
    ];
  },
  async redirects() {
    return wixRedirects;
  },
};

export default nextConfig;
