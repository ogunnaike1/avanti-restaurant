import Image from "next/image";

/*
 * The supplied AVANTI artwork — one file, cropped three ways, so the wordmark in
 * the header is the same drawing as the mark in the hero. The gold is bevelled and the shadow side of every
 * letter is the same maroon as the ground, so the ground cannot be keyed out
 * without gouging the letterforms. `scripts/prep-logo.js` instead crops the art,
 * drops its ground to black, converts that black to transparency and feathers the
 * edges. The mark therefore drops onto photographs and flat wine alike with no
 * visible tile — but it still wants a DARK backdrop: the gold has dark bevelled
 * facets that vanish against cream.
 */
const art = {
  stacked: {
    src: "/avanti-stacked.png",
    width: 2000,
    height: 1302,
    alt: "AVANTI Restaurant",
  },
  wordmark: {
    src: "/avanti-wordmark.png",
    width: 2000,
    height: 410,
    alt: "AVANTI Restaurant",
  },
  monogram: {
    src: "/avanti-monogram.png",
    width: 1000,
    height: 793,
    alt: "AVANTI",
  },
} as const;

export type LogoVariant = keyof typeof art;

export default function Logo({
  variant = "stacked",
  className = "",
  priority = false,
  decorative = false,
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  /** Set when the mark only repeats wording that is already beside it. */
  decorative?: boolean;
}) {
  const { src, width, height, alt } = art[variant];

  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
