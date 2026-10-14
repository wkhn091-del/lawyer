import type { Metadata } from "next";
import { HomeFaq } from "@/components/home/HomeFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/content/home";
import { faqPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "שאלות נפוצות",
  description: "תשובות קצרות על פנייה למשרד, זמני חזרה ושכר טרחה.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...faqPageSchema(faq),
        }}
      />
      <HomeFaq />
    </>
  );
}
