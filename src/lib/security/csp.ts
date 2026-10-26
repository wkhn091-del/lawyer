type Directives = Record<string, readonly string[]>;

/** Only tools approved for launch (GTM, GA4, Ads, Clarity). Add a host here only when it ships. */
const ANALYTICS_CONNECT = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://www.googletagmanager.com",
  "https://*.doubleclick.net",
  "https://www.google.com",
  "https://*.clarity.ms",
] as const;

const ANALYTICS_IMG = [
  "https://www.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.doubleclick.net",
  "https://www.google.com",
  "https://www.google.co.il",
  "https://*.clarity.ms",
] as const;

/** Script hosts GTM is allowed to pull. No 'strict-dynamic': it would trust any script GTM injects. */
const ANALYTICS_SCRIPT = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.clarity.ms",
  "https://*.doubleclick.net",
] as const;

const TURNSTILE = "https://challenges.cloudflare.com";
const CSP_REPORT_GROUP = "csp";

function serialize(directives: Directives): string {
  return Object.entries(directives)
    .map(([name, values]) => (values.length ? `${name} ${values.join(" ")}` : name))
    .join("; ");
}

export function buildSiteCsp(nonce: string, isDev: boolean): string {
  return serialize({
    "default-src": ["'self'"],
    // Explicit host allowlist, no 'strict-dynamic' and no bare "https:" in production:
    // a compromised GTM tag cannot pull scripts from unlisted hosts.
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      TURNSTILE,
      ...ANALYTICS_SCRIPT,
      ...(isDev ? ["'unsafe-eval'", "https:"] : []),
    ],
    "style-src": ["'self'", `'nonce-${nonce}'`],
    // React style props and Motion write inline style attributes, which a nonce cannot cover.
    "style-src-attr": ["'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", ...ANALYTICS_IMG],
    "font-src": ["'self'"],
    "connect-src": [
      "'self'",
      TURNSTILE,
      "https://formsubmit.co",
      ...ANALYTICS_CONNECT,
      ...(isDev ? ["ws:"] : []),
    ],
    "frame-src": [TURNSTILE, "https://td.doubleclick.net", "https://www.googletagmanager.com"],
    "worker-src": ["'self'", "blob:"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    // Level C — browser posts violations to our collector (no PII stored).
    "report-uri": ["/api/csp-report"],
    "report-to": [CSP_REPORT_GROUP],
    ...(isDev ? {} : { "upgrade-insecure-requests": [] }),
  });
}

/** Reporting-Endpoints header value (pairs with CSP report-to). */
export function buildReportingEndpoints(): string {
  return `${CSP_REPORT_GROUP}="/api/csp-report"`;
}

export function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}
