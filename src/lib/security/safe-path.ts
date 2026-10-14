/**
 * Only allow same-site relative paths for redirects (blocks open redirects).
 * Rejects protocol-relative URLs, absolute URLs, and backslash tricks.
 */
export function safeInternalPath(candidate: string | null | undefined, fallback = "/"): string {
  if (!candidate) return fallback;
  const value = candidate.trim();
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  if (value.includes("\\")) return fallback;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) return fallback;
  if (value.includes("@")) return fallback;
  return value.slice(0, 200) || fallback;
}
