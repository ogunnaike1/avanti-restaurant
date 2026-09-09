"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.nav
        aria-label="Primary"
        animate={{
          backgroundColor: scrolled ? "rgba(56,1,9,0.92)" : "rgba(56,1,9,0)",
          paddingTop: scrolled ? 14 : 24,
          paddingBottom: scrolled ? 14 : 24,
          borderColor: scrolled ? "rgba(142,111,87,0.28)" : "rgba(218,176,97,0)",
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-5 border-b px-[clamp(18px,5vw,64px)] backdrop-blur-[6px]"
      >
        <Link href="/" aria-label="AVANTI home" className="block">
          <Logo
            variant="wordmark"
            priority
            className="h-[26px] w-auto transition-all duration-500 sm:h-[32px]"
          />
        </Link>

        <div className="hidden items-center gap-[clamp(18px,2.6vw,38px)] lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:text-gold ${
                isActive(link.href) ? "border-gold" : "border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border border-gold bg-gold px-6 py-3 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-wine transition-all duration-300 hover:bg-transparent hover:tracking-[0.26em] hover:text-gold"
          >
            Reserve a Table
          </Link>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex flex-col gap-1.5 p-2.5 lg:hidden"
        >
          <span className="block h-px w-[26px] bg-cream" />
          <span className="block h-px w-[26px] bg-cream" />
          <span className="block h-px w-4 bg-gold" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ x: "104%" }}
            animate={{ x: 0 }}
            exit={{ x: "104%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex flex-col justify-center gap-1.5 bg-wine p-[clamp(28px,8vw,72px)]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-[clamp(18px,5vw,64px)] top-6 font-serif text-3xl leading-none text-sand"
            >
              &times;
            </button>
            <Logo variant="stacked" className="mb-8 h-auto w-[190px]" />
            <p className="eyebrow mb-6 text-taupe">Menu</p>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-taupe/35 py-4 font-serif text-[34px] text-cream"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-5 border border-gold bg-gold px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-wine"
            >
              Reserve a Table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
