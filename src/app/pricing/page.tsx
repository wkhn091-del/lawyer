import { redirect } from "next/navigation";

/** Legacy path (Wix/old IA) — no public pricing on the law-firm site. */
export default function PricingRedirect() {
  redirect("/");
}
