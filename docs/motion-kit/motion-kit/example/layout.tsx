import type { Metadata } from "next";
import { MotionProvider } from "../motion";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motion Kit Demo",
  description: "Scroll animations, smooth scroll and page transitions for Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* One prop sets the feel of the whole site: "luxury" | "studio" | "snappy" | "minimal" */}
        <MotionProvider preset="studio">{children}</MotionProvider>
      </body>
    </html>
  );
}
