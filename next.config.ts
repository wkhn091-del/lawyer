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
  if (process.env.VERCEL_URL) hosts.add(process.env.VERCEL_URL);
  return [...hosts];
}

const nextConfig: NextConfig = {
  turbopack: { root: import.meta.dirname },
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // No remote CMS images yet — keep allowlist empty (local /public only).
    remotePatterns: [],
  },
  experimental: {
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
