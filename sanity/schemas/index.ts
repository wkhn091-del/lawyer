/**
 * Sanity schemas for Cohen & Co. — wire Studio when ready.
 * Until then the live site reads from `src/content/*`.
 */

export const serviceFields = {
  name: "service",
  title: "תחום שירות",
  type: "document",
  fields: [
    { name: "title", title: "כותרת", type: "localeString", validation: (r: { max: (n: number) => unknown }) => r.max(80) },
    { name: "slug", title: "כתובת", type: "slug", options: { source: "title.he" } },
    { name: "summary", title: "תקציר", type: "localeText" },
    { name: "body", title: "תוכן", type: "localeBlock" },
    { name: "topics", title: "נושאים", type: "array", of: [{ type: "string" }] },
    { name: "seoTitle", title: "SEO כותרת", type: "localeString" },
    { name: "seoDescription", title: "SEO תיאור", type: "localeText" },
  ],
};

export const siteSettingsFields = {
  name: "siteSettings",
  title: "הגדרות אתר",
  type: "document",
  fields: [
    { name: "legalName", title: "שם משפטי", type: "string" },
    { name: "companyId", title: "ח.פ / ע.מ", type: "string" },
    { name: "address", title: "כתובת", type: "text" },
    { name: "phone", title: "טלפון", type: "string" },
    { name: "email", title: "מייל", type: "string" },
    { name: "whatsapp", title: "וואטסאפ (נייד)", type: "string" },
    { name: "hours", title: "שעות מענה", type: "string" },
    { name: "accessibilityCoordinator", title: "רכז נגישות", type: "string" },
  ],
};

/**
 * Future testimonials — never render an empty reviews block on the live site.
 * Publish only with written client consent; status must be "approved".
 */
export const testimonialFields = {
  name: "testimonial",
  title: "המלצת לקוח",
  type: "document",
  fields: [
    { name: "quote", title: "ציטוט", type: "text", validation: (r: { max: (n: number) => unknown }) => r.max(500) },
    { name: "authorName", title: "שם מלא", type: "string" },
    {
      name: "practiceArea",
      title: "תחום",
      type: "string",
      options: { list: ["family", "labor", "real-estate", "other"] },
    },
    {
      name: "status",
      title: "סטטוס אישור",
      type: "string",
      options: { list: ["pending", "approved", "rejected"] },
      initialValue: "pending",
    },
    { name: "consentAt", title: "תאריך אישור לפרסום", type: "datetime" },
    { name: "sourceNote", title: "הערת מקור פנימית", type: "string" },
  ],
};
