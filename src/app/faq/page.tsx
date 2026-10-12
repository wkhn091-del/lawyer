import type { Metadata } from "next";
import { HomeFaq } from "@/components/home/HomeFaq";

export const metadata: Metadata = {
  title: "שאלות נפוצות",
  description: "תשובות קצרות על פנייה למשרד, זמני חזרה ושכר טרחה.",
};

export default function FaqPage() {
  return <HomeFaq />;
}
