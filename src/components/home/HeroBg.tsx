"use client";

import Image from "next/image";
import { Parallax } from "@/motion";

export function HeroBg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Crop toward the lit interior — hides the dark facade pillar on the photo’s left */}
      <Parallax image speed={0.12} className="absolute inset-0 h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_38%] scale-110 md:object-[82%_42%]"
        />
      </Parallax>
    </div>
  );
}
