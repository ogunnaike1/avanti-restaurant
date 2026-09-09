"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const times = ["12:00", "13:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const sizes = ["1", "2", "3", "4", "5", "6", "7", "8+"];

const fieldClass =
  "w-full border border-taupe/40 bg-transparent px-4 py-3.5 text-[15px] font-light text-ink outline-none transition-colors duration-300 placeholder:text-taupe/70 focus:border-gold";
const labelClass = "mb-2 block text-[10px] uppercase tracking-[0.26em] text-taupe";

export default function ReservationForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend yet — swap this for the reservations API when it exists.
    setSent(true);
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-gold bg-wine px-8 py-12 text-center"
          >
            <Logo variant="monogram" decorative className="mx-auto mb-6 h-auto w-[86px]" />
            <p className="eyebrow m-0 mb-4 text-gold">Request received</p>
            <h3 className="m-0 mb-4 font-serif text-[32px] font-light text-ivory">
              We will call to confirm.
            </h3>
            <p className="m-0 text-[15px] font-light leading-[1.8] text-stone">
              The house replies to every request within two hours of opening. For tonight, please
              ring us on{" "}
              <a href="tel:+2348012345678" className="text-gold">
                +234 801 234 5678
              </a>
              .
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-7 border-b border-gold pb-1 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gold"
            >
              Make another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="name">
                Full name
              </label>
              <input id="name" name="name" required className={fieldClass} placeholder="Ada Nwosu" />
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
                className={fieldClass}
                placeholder="you@example.com"
              />
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
                className={fieldClass}
                placeholder="+234 800 000 0000"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="date">
                Date
              </label>
              <input id="date" name="date" type="date" required className={fieldClass} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="time">
                  Time
                </label>
                <select id="time" name="time" required defaultValue="19:00" className={fieldClass}>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="guests">
                  Guests
                </label>
                <select id="guests" name="guests" required defaultValue="2" className={fieldClass}>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="notes">
                Occasion or dietary notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className={`${fieldClass} resize-none`}
                placeholder="Anniversary, no shellfish, window table if possible…"
              />
            </div>

            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                whileHover={{ letterSpacing: "0.3em" }}
                transition={{ duration: 0.35 }}
                className="w-full border border-wine bg-wine px-10 py-[19px] text-[11px] font-semibold uppercase tracking-[0.22em] text-linen transition-colors duration-400 hover:border-gold hover:bg-gold hover:text-wine"
              >
                Request Reservation
              </motion.button>
              <p className="m-0 mt-4 text-[12.5px] font-light leading-[1.7] text-taupe">
                Tables are held for fifteen minutes. Parties of eight or more are confirmed by phone.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
