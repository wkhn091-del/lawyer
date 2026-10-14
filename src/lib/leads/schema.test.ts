import { describe, expect, it } from "vitest";
import { leadSchema, normalizeIsraeliPhone, quickLeadSchema } from "./schema";

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

  it("strips CRLF from message", () => {
    const result = leadSchema.safeParse({
      fullName: "ישראל ישראלי",
      email: "israel@example.co.il",
      phone: "0501234567",
      practiceArea: "family",
      message: "שורה ראשונה\r\nBcc: evil@example.com\nהמשך הודעה תקינה.",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).not.toMatch(/[\r\n]/);
      expect(result.data.message).toContain("Bcc: evil@example.com");
    }
  });
});

describe("quickLeadSchema", () => {
  it("accepts name + phone + area without email or message", () => {
    const result = quickLeadSchema.safeParse({
      fullName: "ישראל ישראלי",
      email: "",
      phone: "050-1234567",
      practiceArea: "real-estate",
      message: "  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBeUndefined();
      expect(result.data.message).toBeUndefined();
    }
  });

  it("still validates email when provided", () => {
    const result = quickLeadSchema.safeParse({
      fullName: "ישראל ישראלי",
      email: "not-an-email",
      phone: "0501234567",
      practiceArea: "family",
    });
    expect(result.success).toBe(false);
  });

  it("full schema still requires email and message", () => {
    const result = leadSchema.safeParse({
      fullName: "ישראל ישראלי",
      phone: "0501234567",
      practiceArea: "family",
    });
    expect(result.success).toBe(false);
  });
});
