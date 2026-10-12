import { describe, expect, it } from "vitest";
import { leadSchema, normalizeIsraeliPhone } from "./schema";

describe("normalizeIsraeliPhone", () => {
  it("accepts local mobile", () => {
    expect(normalizeIsraeliPhone("050-1234567")).toBe("0501234567");
  });

  it("accepts +972", () => {
    expect(normalizeIsraeliPhone("+972 50-123-4567")).toBe("0501234567");
  });

  it("accepts landline", () => {
    expect(normalizeIsraeliPhone("03-6125890")).toBe("036125890");
  });

  it("rejects short numbers", () => {
    expect(normalizeIsraeliPhone("123")).toBeNull();
  });
});

describe("leadSchema", () => {
  it("accepts a full lead", () => {
    const result = leadSchema.safeParse({
      fullName: "ישראל ישראלי",
      email: "israel@example.co.il",
      phone: "0501234567",
      practiceArea: "family",
      message: "אני בתהליך גירושין וצריכה ייעוץ ראשוני.",
    });
    expect(result.success).toBe(true);
  });

  it("requires message length", () => {
    const result = leadSchema.safeParse({
      fullName: "ישראל ישראלי",
      email: "israel@example.co.il",
      phone: "0501234567",
      practiceArea: "labor",
      message: "קצר",
    });
    expect(result.success).toBe(false);
  });
});
