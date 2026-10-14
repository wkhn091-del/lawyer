import { describe, expect, it } from "vitest";
import { safeInternalPath } from "./safe-path";

describe("safeInternalPath", () => {
  it("allows internal paths", () => {
    expect(safeInternalPath("/thank-you")).toBe("/thank-you");
    expect(safeInternalPath("/contact#lead")).toBe("/contact#lead");
  });

  it("blocks open redirects", () => {
    expect(safeInternalPath("https://evil.com")).toBe("/");
    expect(safeInternalPath("//evil.com")).toBe("/");
    expect(safeInternalPath("/\\evil.com")).toBe("/");
    expect(safeInternalPath("javascript:alert(1)")).toBe("/");
  });
});
