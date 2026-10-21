"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function PasswordGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy || !password) return;
    setBusy(true);
    setError(false);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
    } catch {
      // Treated the same as a wrong password.
    }
    setError(true);
    setBusy(false);
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-wine p-5">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] border border-gold/40 bg-[rgba(20,2,5,.7)] px-[clamp(24px,6vw,48px)] py-[clamp(32px,6vw,52px)] text-center shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]"
      >
        <Logo variant="stacked" priority className="mx-auto mb-8 h-auto w-[200px]" />
        <p className="eyebrow m-0 mb-3 text-gold">Private preview</p>
        <h1
          id="gate-title"
          className="m-0 mb-7 font-serif text-[28px] font-light italic leading-tight text-linen"
        >
          Enter the password to continue.
        </h1>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="gate-password">
            Password
          </label>
          <input
            id="gate-password"
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            aria-invalid={error}
            aria-describedby={error ? "gate-error" : undefined}
            className="w-full border border-cream/30 bg-transparent px-4 py-[15px] text-center text-[15px] tracking-[0.12em] text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-gold"
          />
          <p
            id="gate-error"
            role="alert"
            className={`m-0 min-h-[18px] text-[12px] tracking-[0.06em] text-[#e8a0a0] ${error ? "" : "invisible"}`}
          >
            That password isn&apos;t right. Please try again.
          </p>
          <button
            type="submit"
            disabled={busy || !password}
            className="border border-gold bg-gold px-[34px] py-[16px] text-[11px] font-semibold uppercase tracking-[0.22em] text-wine transition-colors duration-300 hover:bg-transparent hover:text-gold disabled:opacity-50"
          >
            {busy ? "Checking…" : "Enter"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
