import Image from "next/image";

type Props = {
  /** Path under /public. Without it, a labelled placeholder is rendered instead. */
  src?: string;
  alt?: string;
  label: string;
  /** Responsive hint for the optimiser; default assumes a full-width slot. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Art-directed image slot. Fills whatever box it is given, so every caller keeps
 * control of the aspect ratio, and falls back to a labelled placeholder while a
 * photograph is missing.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  sizes = "100vw",
  priority,
  className = "",
}: Props) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={label}
        className={`flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#5A211C_0%,#3F0D0C_45%,#2B0908_100%)] ${className}`}
      >
        <span className="max-w-[70%] text-center font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt ?? label}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
