import Image from "next/image";

/** Full-bleed hero photo — serve the file as-is (no AVIF recompress that softens edges). */
export function HeroBg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-navy-deep)]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        unoptimized
        sizes="100vw"
        className="object-cover object-[58%_40%]"
      />
    </div>
  );
}
