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
  /** CSS object-position, to choose which part of the photo survives the crop. */
  position?: string;
  /** Load right away, but without competing with the priority image. */
  eager?: boolean;
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
  position,
  eager,
}: Props) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={label}
        className={`flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#6E1428_0%,#580A1A_45%,#3A0610_100%)] ${className}`}
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
        {...(eager && !priority ? { loading: "eager" as const, fetchPriority: "low" as const } : {})}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
