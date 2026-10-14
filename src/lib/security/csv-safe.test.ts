import { describe, expect, it } from "vitest";
import { csvSafeCell } from "./csv-safe";

describe("csvSafeCell", () => {
  it("prefixes formula-like values", () => {
    expect(csvSafeCell("=cmd|'/c calc'!A0")).toBe("'=cmd|'/c calc'!A0");
    expect(csvSafeCell("+1234")).toBe("'+1234");
    expect(csvSafeCell("-1+1")).toBe("'-1+1");
    expect(csvSafeCell("@SUM(A1)")).toBe("'@SUM(A1)");
  });

  it("leaves normal names alone", () => {
    expect(csvSafeCell("ישראל ישראלי")).toBe("ישראל ישראלי");
    expect(csvSafeCell("hello")).toBe("hello");
  });
});
