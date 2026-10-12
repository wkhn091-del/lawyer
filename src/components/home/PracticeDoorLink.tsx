"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { PracticeAreaId } from "@/lib/leads/options";

export function PracticeDoorLink({
  href,
  areaId,
  className,
  children,
}: {
  href: string;
  areaId: PracticeAreaId;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem("practiceArea", areaId);
        } catch {
          /* ignore */
        }
      }}
    >
      {children}
    </Link>
  );
}
