import Image from "next/image";

/** Full-bleed hero photo — sharp, no parallax scale (that softens low-res crops). */
export function HeroBg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        quality={90}
        sizes="100vw"
        className="object-cover object-[62%_42%] md:object-[58%_40%]"
      />
    </div>
  );
}
