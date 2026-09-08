type Props = {
  /** Optional real image; when absent an editorial placeholder is rendered. */
  src?: string;
  alt?: string;
  label: string;
  className?: string;
  priority?: boolean;
};

/**
 * Art-directed image slot. Drop a `src` in to swap the placeholder for the
 * real photograph without touching any layout.
 */
export default function ImageSlot({ src, alt, label, className = "", priority }: Props) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? label}
        loading={priority ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

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
