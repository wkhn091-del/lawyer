import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

/** Full-bleed atmospheric strip — breaks flat white between sections. */
export function AtmosphereBand({ src, alt, caption = "הדמיה", className }: Props) {
  return (
    <aside className={`relative h-40 overflow-hidden md:h-56 ${className ?? ""}`} aria-hidden={caption ? undefined : true}>
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-navy/35" />
      {caption ? (
        <p className="photo-caption absolute bottom-3 start-5 text-small md:start-8">{caption}</p>
      ) : null}
    </aside>
  );
}
