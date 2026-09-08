"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Logo, { type LogoVariant } from "./Logo";

const palettes = [
  { id: "gold", label: "Gold on wine", bg: "#3F0D0C", tone: "gold" as const, color: "", accent: "" },
  { id: "ink", label: "Gold on ink", bg: "#241110", tone: "gold" as const, color: "", accent: "" },
  {
    id: "wine",
    label: "Wine on cream",
    bg: "#F4EFE6",
    tone: "solid" as const,
    color: "#3F0D0C",
    accent: "#8E6F57",
  },
  {
    id: "mono",
    label: "Cream on ink",
    bg: "#1B0605",
    tone: "solid" as const,
    color: "#F4EFE6",
    accent: "#D9C4A9",
  },
];

type Palette = (typeof palettes)[number];

const lockups: { id: LogoVariant; name: string; use: string; width: string }[] = [
  { id: "lockup", name: "Primary lockup", use: "Signage, site header, menus", width: "w-[86%]" },
  { id: "stacked", name: "Stacked signature", use: "Menu covers, print, packaging", width: "w-[62%]" },
  { id: "monogram", name: "Swash monogram", use: "Plates, coasters, avatar", width: "w-[38%]" },
  { id: "wordmark", name: "Wordmark only", use: "Small sizes, captions, footers", width: "w-[80%]" },
];

export default function LogoStudio() {
  const [palette, setPalette] = useState<Palette>(palettes[0]);

  return (
    <>
      <div className="sticky top-[62px] z-40 border-b border-taupe/25 bg-cream/95 px-[clamp(20px,5vw,64px)] backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-[1240px] items-center gap-[clamp(14px,2.4vw,32px)] overflow-x-auto py-5">
          <span className="eyebrow shrink-0 text-taupe">Palette</span>
          {palettes.map((option) => (
            <button
              key={option.id}
              onClick={() => setPalette(option)}
              className={`flex shrink-0 items-center gap-2.5 border-b pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                palette.id === option.id
                  ? "border-gold text-wine"
                  : "border-transparent text-taupe hover:text-wine"
              }`}
            >
              <span
                className="size-3.5 rounded-full border border-taupe/40"
                style={{ background: option.bg }}
              />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] pb-[clamp(80px,11vw,140px)] pt-[clamp(48px,7vw,90px)]">
        <div className="mx-auto grid max-w-[1240px] gap-[clamp(18px,2.4vw,32px)] md:grid-cols-2">
          {lockups.map((lockup, i) => (
            <motion.figure
              key={lockup.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="m-0 border border-taupe/25"
            >
              <motion.div
                animate={{ backgroundColor: palette.bg }}
                transition={{ duration: 0.6 }}
                className="flex min-h-[clamp(260px,34vw,380px)] items-center justify-center p-10"
              >
                <motion.div
                  key={`${lockup.id}-${palette.id}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex w-full justify-center`}
                >
                  <Logo
                    variant={lockup.id}
                    tone={palette.tone}
                    color={palette.color || undefined}
                    accent={palette.accent || undefined}
                    className={lockup.width}
                  />
                </motion.div>
              </motion.div>
              <figcaption className="flex items-baseline justify-between gap-4 bg-cream px-6 py-5">
                <span className="font-serif text-[21px] text-wine">{lockup.name}</span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-taupe">
                  {lockup.use}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mx-auto mt-[clamp(48px,7vw,88px)] grid max-w-[1240px] gap-[clamp(24px,3vw,44px)] md:grid-cols-3">
          <div>
            <p className="eyebrow m-0 mb-4 text-taupe">Clear space</p>
            <p className="m-0 text-[14.5px] font-light leading-[1.85] text-cocoa text-pretty">
              Keep a margin equal to the cap-height of the A on every side. The swash never touches
              another element, and the mark never sits inside a box it did not ask for.
            </p>
          </div>
          <div>
            <p className="eyebrow m-0 mb-4 text-taupe">Typography</p>
            <p className="m-0 text-[14.5px] font-light leading-[1.85] text-cocoa text-pretty">
              Cormorant Garamond Regular at 0.07em tracking for the mark; Manrope at 0.42em for the
              FINE DINING RESTAURANT descriptor. Never bold either.
            </p>
          </div>
          <div>
            <p className="eyebrow m-0 mb-4 text-taupe">Gold</p>
            <div className="flex flex-wrap gap-2.5">
              {["#F7E9BE", "#DAB061", "#B98A38", "#3F0D0C", "#241110"].map((hex) => (
                <div key={hex} className="w-[86px]">
                  <div className="h-12 border border-taupe/25" style={{ background: hex }} />
                  <p className="m-0 mt-2 text-[10px] tracking-[0.18em] text-taupe">{hex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
