"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const times = ["12:00", "13:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const sizes = ["1", "2", "3", "4", "5", "6", "7", "8+"];

const fieldClass =
  "w-full border border-taupe/40 bg-transparent px-4 py-3.5 text-[15px] font-light text-ink outline-none transition-colors duration-300 placeholder:text-taupe/70 focus:border-gold";
const labelClass =
  "mb-2 block text-[10px] uppercase tracking-[0.26em] text-taupe";
const errorClass = "m-0 mt-1.5 text-[12px] font-light text-[#9B2C2C]";

type Confirmation = { reference: string; date: string; time: string };

export default function ReservationForm({
  compact = false,
  onDone,
}: {
  /** Tighter spacing for the dialog. */
  compact?: boolean;
  /** Called from the confirmation screen — closes the dialog, if there is one. */
  onDone?: () => void;
}) {
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const data = Object.fromEntries(new FormData(event.currentTarget));
    setSending(true);
    setErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();

      if (!response.ok) {
        if (payload.errors) setErrors(payload.errors);
        else
          setFormError(
            payload.error ?? "Something went wrong. Please try again.",
          );
        return;
      }

      setConfirmation(payload as Confirmation);
    } catch {
      setFormError(
        "We could not reach the house. Check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="relative">
      {confirmation ? (
        <motion.div
          key="confirmation"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`border border-gold bg-wine text-center ${compact ? "px-6 py-10" : "px-8 py-12"}`}
        >
          <Logo
            variant="monogram"
            decorative
            className="mx-auto mb-6 h-auto w-[86px]"
          />
          <p className="eyebrow m-0 mb-4 text-gold">Table requested</p>
          <h3 className="m-0 mb-4 font-serif text-[30px] font-light text-ivory">
            We will call to confirm.
          </h3>
          <p className="m-0 text-[15px] font-light leading-[1.8] text-stone">
            {confirmation.date} at {confirmation.time}. Quote{" "}
            <span className="text-gold">{confirmation.reference}</span> if you
            ring us.
          </p>
          <p className="m-0 mt-3 text-[14px] font-light leading-[1.8] text-stone/80">
            The house replies to every request within two hours of opening — or
            call{" "}
            <a href="tel:+2348012345678" className="text-gold">
              +234 801 234 5678
            </a>
            .
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => setConfirmation(null)}
              className="border-b border-gold pb-1 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gold"
            >
              Book another table
            </button>
            {onDone && (
              <button
                onClick={onDone}
                className="border-b border-transparent pb-1 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-stone hover:border-stone"
              >
                Done
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`grid sm:grid-cols-2 ${compact ? "gap-4" : "gap-5"}`}
        >
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              className={fieldClass}
              placeholder="Ada Nwosu"
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className={fieldClass}
              placeholder="you@example.com"
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              className={fieldClass}
              placeholder="+234 800 000 0000"
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="date">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              min={today}
              defaultValue={today}
              aria-invalid={Boolean(errors.date)}
              className={fieldClass}
            />
            {errors.date && <p className={errorClass}>{errors.date}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="time">
                Time
              </label>
              <select
                id="time"
                name="time"
                required
                defaultValue="19:00"
                className={fieldClass}
              >
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && <p className={errorClass}>{errors.time}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="guests">
                Guests
              </label>
              <select
                id="guests"
                name="guests"
                required
                defaultValue="2"
                className={fieldClass}
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              {errors.guests && <p className={errorClass}>{errors.guests}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="notes">
              Occasion or dietary notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={compact ? 3 : 4}
              className={`${fieldClass} resize-none`}
              placeholder="Anniversary, no shellfish, window table if possible…"
            />
          </div>

          <div className="sm:col-span-2">
            {formError && (
              <p
                role="alert"
                className="m-0 mb-3 border border-[#9B2C2C]/40 px-4 py-3 text-[13px] font-light text-[#9B2C2C]"
              >
                {formError}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="w-full border border-wine bg-wine px-10 py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-linen transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-wine disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending…" : "Request Reservation"}
            </button>
            <p className="m-0 mt-4 text-[12.5px] font-light leading-[1.7] text-taupe">
              Tables are held for fifteen minutes. Parties of eight or more are
              confirmed by phone.
            </p>
          </div>
        </motion.form>
      )}
    </div>
  );
}
