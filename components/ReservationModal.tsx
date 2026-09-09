"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import ReservationForm from "./ReservationForm";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ReservationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  // Escape closes; Tab is kept inside the dialog while it is open.
  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("input, select, textarea")
        ?.focus();
    }, 120);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      window.clearTimeout(timer);
      restoreFocusTo.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="reservation-modal"
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="fixed inset-0 bg-[rgba(16,1,4,.72)] backdrop-blur-[3px]"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-auto w-full max-w-[620px] border border-taupe/30 bg-cream px-[clamp(20px,4vw,44px)] pb-[clamp(28px,4vw,40px)] pt-[clamp(28px,4vw,40px)] shadow-[0_40px_90px_-40px_rgba(16,1,4,.8)]"
          >
            <button
              onClick={onClose}
              aria-label="Close reservation form"
              className="absolute right-4 top-3 p-2 font-serif text-3xl leading-none text-taupe transition-colors hover:text-wine"
            >
              &times;
            </button>

            <div className="mb-7 border-b border-taupe/25 pb-6 text-center">
              <div className="mb-4 inline-block bg-wine px-5 py-3">
                <Logo
                  variant="monogram"
                  decorative
                  className="h-auto w-[52px]"
                />
              </div>
              <p className="eyebrow m-0 mb-3 text-taupe">Reservations</p>
              <h2
                id="reservation-modal-title"
                className="m-0 font-serif text-[clamp(28px,4vw,38px)] font-light leading-tight text-wine"
              >
                Book your table
              </h2>
              <p className="m-0 mt-3 text-[13.5px] font-light leading-[1.7] text-clay">
                Nightly, 12:00 &ndash; 23:00 &middot; Old Bodija, Ibadan
              </p>
            </div>

            <ReservationForm compact onDone={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
