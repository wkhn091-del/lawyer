import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env/public";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL;
  const paths = [
    "/",
    "/about",
    "/team",
    "/contact",
    "/faq",
    "/blog",
    "/services",
    "/services/family",
    "/services/labor",
    "/services/real-estate",
    "/en",
    "/privacy",
    "/terms",
    "/accessibility",
    "/cookies",
  ];
  return paths.map((path, index) => ({
    url: `${base}${path === "/" ? "/" : path}`,
    changeFrequency: path.startsWith("/services") || path === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path.startsWith("/services") ? 0.9 : 0.6,
  }));
}
