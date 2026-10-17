import { expect, test, type Page } from "@playwright/test";

/** Server treats fills faster than 2.5s after mount as bots. */
const HUMAN_FILL_MS = 2600;

async function openLeadForm(page: Page) {
  await page.goto("/contact");
  await page.locator("#lead").scrollIntoViewIfNeeded();
  await page.waitForTimeout(HUMAN_FILL_MS);
}

test.describe("בית וניווט", () => {
  test("מציג מותג ו-CTA ראשי", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("כהן ושות׳").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /לקביעת פגישת ייעוץ|צור קשר/ }).first()).toBeVisible();
  });

  test("JSON-LD Organization/LegalService בבית", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(jsonLd).toBeTruthy();
    expect(jsonLd!).toContain("LegalService");
    expect(jsonLd!).toContain("Organization");
    expect(jsonLd!).not.toContain("<");
  });
});

test.describe("מדידה", () => {
  test("בלי הסכמה לא נשלח generate_lead", async ({ page }) => {
    await openLeadForm(page);
    await page.locator("#field-fullName").fill("ישראל ישראלי");
    await page.locator("#field-phone").fill("0501234567");
    await page.locator("#field-email").fill("israel@example.co.il");
    await page.locator("#field-message").fill("אני בתהליך גירושין וצריכה ייעוץ ראשוני.");
    await page.getByRole("button", { name: "לקביעת פגישת ייעוץ" }).click();
    await expect(page).toHaveURL(/\/thank-you$/);
    const events = await page.evaluate(() =>
      ((window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer ?? []).filter(
        (entry) => entry.event === "generate_lead",
      ),
    );
    expect(events).toEqual([]);
  });
});

test.describe("טופס ליד", () => {
  test("שליחה ריקה מציגה שגיאות ומעבירה פוקוס", async ({ page }) => {
    await openLeadForm(page);
    await page.getByRole("button", { name: "לקביעת פגישת ייעוץ" }).click();
    await expect(page.getByText("כתבו את השם המלא")).toBeVisible();
    await expect(page.locator("#field-fullName")).toBeFocused();
  });

  test("שליחה תקינה מגיעה לעמוד התודה", async ({ page }) => {
    await openLeadForm(page);
    await page.locator("#field-fullName").fill("ישראל ישראלי");
    await page.locator("#field-phone").fill("0501234567");
    await page.locator("#field-email").fill("israel@example.co.il");
    await page.locator("#field-message").fill("אני בתהליך גירושין וצריכה ייעוץ ראשוני.");
    await page.getByRole("button", { name: "לקביעת פגישת ייעוץ" }).click();
    await expect(page).toHaveURL(/\/thank-you$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/הפנייה התקבלה|קיבלנו/);
  });
});

test.describe("נגישות בסיסית", () => {
  test("reduced-motion: העמוד נטען", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByText("כהן ושות׳").first()).toBeVisible();
  });

  test("תפריט מובייל: Tab נשאר בתוך התפריט ו-Escape מחזיר פוקוס", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "פתיחת תפריט" });
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "תפריט ניווט" });
    await expect(dialog).toBeVisible();

    const linkCount = await dialog.getByRole("link").count();
    for (let i = 0; i < linkCount + 3; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => {
        const active = document.activeElement;
        return Boolean(active?.closest('[role="dialog"]') || active?.getAttribute("aria-controls"));
      });
      expect(inside).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "פתיחת תפריט" })).toBeFocused();
  });

  test("טופס: שגיאה מקושרת לשדה דרך aria-describedby", async ({ page }) => {
    await openLeadForm(page);
    await page.getByRole("button", { name: "לקביעת פגישת ייעוץ" }).click();
    const field = page.locator("#field-fullName");
    await expect(field).toHaveAttribute("aria-invalid", "true");
    await expect(field).toHaveAccessibleDescription(/כתבו את השם המלא/);
  });
});

test.describe("אבטחה", () => {
  test("כותרות אבטחה ו-CSP עם nonce", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["cross-origin-resource-policy"]).toBe("same-origin");
    expect(headers["strict-transport-security"]).toContain("max-age=63072000");
    expect(headers["x-powered-by"]).toBeUndefined();
    const csp = headers["content-security-policy"];
    expect(csp).toMatch(/script-src [^;]*'nonce-[A-Za-z0-9+/=]+'/);
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toMatch(/script-src [^;]*'unsafe-inline'/);
  });

  test("עמוד התודה ו-health לא נשמרים במטמון משותף", async ({ request }) => {
    const thankYou = await request.get("/thank-you", { maxRedirects: 0 });
    expect(thankYou.headers()["cache-control"]).toContain("no-store");
    const health = await request.get("/api/health");
    expect(health.status()).toBe(200);
    expect(await health.text()).toBe("ok");
    expect(health.headers()["cache-control"]).toContain("no-store");
  });

  test("health דוחה POST", async ({ request }) => {
    const response = await request.post("/api/health");
    expect(response.status()).toBe(405);
  });

  test("security.txt נגיש", async ({ request }) => {
    const response = await request.get("/.well-known/security.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("Contact:");
    expect(body).toContain("avi@cohen-law.co.il");
  });

  test("CSP כולל report-uri ו-Reporting-Endpoints", async ({ request }) => {
    const response = await request.get("/");
    const csp = response.headers()["content-security-policy"] ?? "";
    expect(csp).toContain("report-uri /api/csp-report");
    expect(csp).toContain("report-to csp");
    expect(response.headers()["reporting-endpoints"]).toContain("/api/csp-report");
  });

  test("csp-report מקבל POST ומחזיר 204", async ({ request }) => {
    const response = await request.post("/api/csp-report", {
      data: {
        "csp-report": {
          "effective-directive": "script-src",
          "blocked-uri": "https://evil.example/x.js",
        },
      },
    });
    expect(response.status()).toBe(204);
  });

  test("Server Action בלי Origin נדחה", async ({ page }) => {
    await openLeadForm(page);
    await page.locator("#field-fullName").fill("ישראל ישראלי");
    await page.locator("#field-phone").fill("0501234567");
    await page.locator("#field-email").fill("israel@example.co.il");
    await page.locator("#field-message").fill("אני בתהליך גירושין וצריכה ייעוץ ראשוני.");

    const captured = page.waitForRequest(
      (request) => request.method() === "POST" && Boolean(request.headers()["next-action"]),
    );
    await page.getByRole("button", { name: "לקביעת פגישת ייעוץ" }).click();
    const original = await captured;

    const headers = { ...original.headers() };
    delete headers.origin;
    delete headers.referer;
    const replay = await page.request.post(original.url(), {
      headers,
      data: original.postDataBuffer() ?? undefined,
    });
    const text = await replay.text();
    expect(text).toMatch(/לא הצלחנו לשלוח|משהו השתבש|error/i);
  });
});
