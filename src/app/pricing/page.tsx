import { redirect } from "next/navigation";

/** Legacy CALLBOT route — no public pricing for the law firm site. */
export default function PricingRedirect() {
  redirect("/");
}
