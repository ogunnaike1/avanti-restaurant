"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageSlot from "./ImageSlot";
import Logo from "./Logo";

const slides = [
  { id: "av-hero-1", label: "Hero 01 — candlelit dining room", caption: "Est. 2019 · Victoria Island, Lagos" },
  { id: "av-hero-2", label: "Hero 02 — plated signature dish", caption: "Seasonal · Written each morning" },
  { id: "av-hero-3", label: "Hero 03 — chef at the pass", caption: "Cooked over fire and butter" },
  { id: "av-hero-4", label: "Hero 04 — wine and evening atmosphere", caption: "Long evenings · 42 seats nightly" },
];

const SLIDE_MS = 6500;

export default function Hero() {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);

  useEffect(() => {
    const timer = window.setInterval(advance, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [advance, index]);

  const slide = slides[index];

  return (
    <section
      aria-label="AVANTI"
      className="relative flex min-h-[min(100svh,900px)] items-end overflow-hidden bg-wine"
    >
      <AnimatePresence>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.09 }}
            transition={{ duration: SLIDE_MS / 1000 + 2, ease: "linear" }}
          >
            <ImageSlot label={slide.label} priority={index === 0} />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(63,13,12,.62)_0%,rgba(63,13,12,.28)_42%,rgba(36,7,7,.86)_100%)]" />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-[clamp(20px,5vw,64px)] pb-[clamp(56px,9vh,110px)] pt-[clamp(112px,16vh,168px)]">
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="m-0 text-[10.5px] uppercase tracking-[0.4em] text-gold"
          >
            {slide.caption}
          </motion.p>
        </AnimatePresence>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="m-0"
        >
          <Logo variant="lockup" className="w-[min(660px,88vw)]" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 max-w-[16ch] font-serif text-[clamp(24px,3.4vw,44px)] font-light italic leading-[1.15] text-linen"
        >
          An unforgettable table awaits.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28 }}
          className="m-0 max-w-[52ch] text-[clamp(14px,1.3vw,17px)] font-light leading-[1.85] text-stone text-pretty"
        >
          A modern dining experience where timeless flavours meet contemporary elegance — served
          in a room built for long evenings and short memories that last.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-2 flex flex-wrap gap-3.5"
        >
          <Link
            href="/menu"
            className="border border-gold bg-gold px-[34px] py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-wine transition-all duration-400 hover:bg-transparent hover:tracking-[0.3em] hover:text-gold"
          >
            Explore Our Menu
          </Link>
          <Link
            href="/contact"
            className="border border-cream/45 px-[34px] py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition-all duration-400 hover:border-cream hover:bg-cream hover:text-wine"
          >
            Reserve a Table
          </Link>
        </motion.div>

        <div className="mt-3.5 flex items-center gap-3.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-0.5 w-11 py-4"
            >
              <span
                className={`block h-0.5 bg-gold transition-opacity duration-500 ${
                  i === index ? "opacity-100" : "opacity-30"
                }`}
              />
            </button>
          ))}
          <span className="ml-2.5 text-[10px] tracking-[0.3em] text-cream/55">SCROLL</span>
          <span className="block h-[26px] w-px animate-scroll-hint bg-gold/70" />
        </div>
      </div>
    </section>
  );
}
