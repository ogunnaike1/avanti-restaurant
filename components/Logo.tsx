import type { CSSProperties } from "react";

export type LogoVariant = "lockup" | "stacked" | "monogram" | "wordmark" | "compact";

type Props = {
  variant?: LogoVariant;
  /** "gold" paints the engraved metallic gradient; "solid" uses a flat `color`. */
  tone?: "gold" | "solid";
  color?: string;
  /** Secondary colour for the descriptor, rules and ornament. */
  accent?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

/*
 * Ids are shared across instances on purpose: every gradient with the same id
 * is identical, so the first definition in the document serves them all.
 */
const GOLD = "avanti-gold";
const GOLD_SOFT = "avanti-gold-soft";
const SHADOW = "avanti-emboss";

const serif = "var(--font-serif), 'Cormorant Garamond', Georgia, serif";
const sans = "var(--font-sans), 'Manrope', system-ui, sans-serif";

function Defs() {
  return (
    <defs>
      <linearGradient id={GOLD} x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0%" stopColor="#F6E6B4" />
        <stop offset="16%" stopColor="#E7C87E" />
        <stop offset="34%" stopColor="#B98A38" />
        <stop offset="50%" stopColor="#F7E9BE" />
        <stop offset="66%" stopColor="#D8AC5E" />
        <stop offset="82%" stopColor="#A97C2E" />
        <stop offset="100%" stopColor="#EBD096" />
      </linearGradient>
      <linearGradient id={GOLD_SOFT} x1="0" y1="0" x2="0.2" y2="1">
        <stop offset="0%" stopColor="#EAD097" />
        <stop offset="50%" stopColor="#C79B49" />
        <stop offset="100%" stopColor="#E4C486" />
      </linearGradient>
      <filter id={SHADOW} x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1B0605" floodOpacity="0.45" />
      </filter>
    </defs>
  );
}

/** Three-petal flourish used on the divider rule. */
function Ornament({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      {[-24, 0, 24].map((angle) => (
        <path
          key={angle}
          d="M0 0C7 -13 7 -28 0 -42C-7 -28 -7 -13 0 0Z"
          transform={`rotate(${angle})`}
          opacity={angle === 0 ? 1 : 0.85}
        />
      ))}
      <circle cy="6" r="2.4" />
    </g>
  );
}

/** The calligraphic ribbon that sweeps through the A. Drawn 0 0 240 200. */
function Swash({ fill }: { fill: string }) {
  return (
    <path
      fill={fill}
      d="M24 148C50 180 98 158 126 116C146 86 172 86 182 108C191 128 177 148 155 148C172 138 176 122 168 111C157 96 140 102 128 122C102 166 58 178 24 148Z"
    />
  );
}

export default function Logo({
  variant = "lockup",
  tone = "gold",
  color = "#DAB061",
  accent,
  className = "",
  style,
  title = "AVANTI — Fine Dining Restaurant",
}: Props) {
  const main = tone === "gold" ? `url(#${GOLD})` : color;
  const second = tone === "gold" ? `url(#${GOLD_SOFT})` : (accent ?? color);
  const filter = tone === "gold" ? `url(#${SHADOW})` : undefined;

  const wordmark = (props: { x: number; y: number; size: number; anchor?: "middle" | "start" }) => (
    <text
      x={props.x}
      y={props.y}
      textAnchor={props.anchor ?? "middle"}
      fill={main}
      filter={filter}
      fontFamily={serif}
      fontSize={props.size}
      fontWeight={400}
      letterSpacing={props.size * 0.07}
    >
      AVANTI
    </text>
  );

  const descriptor = (props: { x: number; y: number; size: number }) => (
    <text
      x={props.x}
      y={props.y}
      textAnchor="middle"
      fill={second}
      fontFamily={sans}
      fontSize={props.size}
      fontWeight={400}
      letterSpacing={props.size * 0.42}
    >
      FINE DINING RESTAURANT
    </text>
  );

  const rule = (x1: number, x2: number, y: number) => (
    <line x1={x1} x2={x2} y1={y} y2={y} stroke={second} strokeWidth={1.6} opacity={0.85} />
  );

  const shared = { className, style, role: "img" as const, "aria-label": title };

  if (variant === "monogram") {
    return (
      <svg viewBox="0 0 240 210" {...shared}>
        <Defs />
        <title>{title}</title>
        <text
          x="120"
          y="176"
          textAnchor="middle"
          fill={main}
          filter={filter}
          fontFamily={serif}
          fontSize="210"
          fontWeight={400}
        >
          A
        </text>
        <Swash fill={second} />
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <svg viewBox="0 0 1000 240" {...shared}>
        <Defs />
        <title>{title}</title>
        {wordmark({ x: 500, y: 180, size: 190 })}
      </svg>
    );
  }

  if (variant === "compact") {
    return (
      <svg viewBox="0 0 780 170" {...shared}>
        <Defs />
        <title>{title}</title>
        <g transform="translate(0 -6) scale(0.78)">
          <text
            x="120"
            y="176"
            textAnchor="middle"
            fill={main}
            fontFamily={serif}
            fontSize="200"
            fontWeight={400}
          >
            A
          </text>
          <Swash fill={second} />
        </g>
        {wordmark({ x: 226, y: 118, size: 122, anchor: "start" })}
        <text
          x="232"
          y="152"
          fill={second}
          fontFamily={sans}
          fontSize="21"
          letterSpacing="9"
          fontWeight={500}
        >
          RISTORANTE
        </text>
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <svg viewBox="0 0 1000 700" {...shared}>
        <Defs />
        <title>{title}</title>
        <g transform="translate(378 20) scale(1.02)">
          <text
            x="120"
            y="176"
            textAnchor="middle"
            fill={main}
            filter={filter}
            fontFamily={serif}
            fontSize="210"
            fontWeight={400}
          >
            A
          </text>
          <Swash fill={second} />
        </g>
        {wordmark({ x: 500, y: 430, size: 178 })}
        {rule(150, 300, 494)}
        {descriptor({ x: 500, y: 502, size: 30 })}
        {rule(700, 850, 494)}
        <g transform="translate(500 610)">
          <Ornament fill={second} />
        </g>
        {rule(180, 430, 604)}
        {rule(570, 820, 604)}
      </svg>
    );
  }

  // lockup — horizontal, the primary signature
  return (
    <svg viewBox="0 0 1000 420" {...shared}>
      <Defs />
      <title>{title}</title>
      {wordmark({ x: 500, y: 232, size: 205 })}
      {descriptor({ x: 500, y: 306, size: 31 })}
      <g transform="translate(500 392)">
        <Ornament fill={second} />
      </g>
      {rule(210, 448, 386)}
      {rule(552, 790, 386)}
    </svg>
  );
}
