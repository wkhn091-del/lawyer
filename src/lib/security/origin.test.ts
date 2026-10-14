import { describe, expect, it } from "vitest";
import { isSameOrigin } from "./origin";

describe("isSameOrigin", () => {
  it("accepts exact host match", () => {
    expect(isSameOrigin("https://cohen-law.co.il", "cohen-law.co.il")).toBe(true);
    expect(isSameOrigin("https://www.cohen-law.co.il", "www.cohen-law.co.il")).toBe(true);
  });

  it("rejects missing origin or host", () => {
    expect(isSameOrigin(null, "cohen-law.co.il")).toBe(false);
    expect(isSameOrigin("https://cohen-law.co.il", null)).toBe(false);
    expect(isSameOrigin("", "cohen-law.co.il")).toBe(false);
  });

  it("rejects lookalikes and subdomains when host is apex", () => {
    expect(isSameOrigin("https://cohen-law.co.il.evil.com", "cohen-law.co.il")).toBe(false);
    expect(isSameOrigin("https://evilcohen-law.co.il", "cohen-law.co.il")).toBe(false);
    expect(isSameOrigin("https://sub.cohen-law.co.il", "cohen-law.co.il")).toBe(false);
  });

  it("rejects port mismatch", () => {
    expect(isSameOrigin("http://localhost:3000", "localhost:3000")).toBe(true);
    expect(isSameOrigin("http://localhost:3000", "localhost:3001")).toBe(false);
  });

  it("rejects invalid values", () => {
    expect(isSameOrigin("null", "cohen-law.co.il")).toBe(false);
    expect(isSameOrigin("not a url", "cohen-law.co.il")).toBe(false);
  });
});
