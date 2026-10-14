/**
 * Neutralize spreadsheet formula injection when a value may be opened in Excel/Sheets.
 * Cells starting with = + - @ Tab or CR can execute formulas on open.
 */
export function csvSafeCell(value: string): string {
  const trimmed = value.replace(/\u0000/g, "");
  if (/^[=+\-@\t\r]/.test(trimmed)) return `'${trimmed}`;
  return trimmed;
}
