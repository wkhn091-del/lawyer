"use client";

import Image from "next/image";
import { Parallax } from "@/motion";

export function HeroBg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Parallax image speed={0.15} className="absolute inset-[-10%] h-[120%] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </Parallax>
    </div>
  );
}
