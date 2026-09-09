"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageSlot from "./ImageSlot";
import { menu, type MenuGroup } from "@/lib/menu";

const filters = [
  { id: "all", label: "All" },
  ...menu.map((group) => ({ id: group.id, label: group.title.split(" ")[0] })),
] as const;

type FilterId = (typeof filters)[number]["id"];

/** Fold case and accents, so "veloute" finds "Velouté" and "creme" finds "Crème". */
const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Marks the matched run inside a field, when it survives accent folding. */
function Highlight({ text, query }: { text: string; query: string }) {
  const term = query.trim();
  if (!term) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, "gi"));
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-gold/35 text-ink">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const haystack = (item: { name: string; description: string; tag?: string }, section: string) =>
  fold(`${item.name} ${item.description} ${item.tag ?? ""} ${section}`);

export default function MenuBrowser() {
  const [active, setActive] = useState<FilterId>("all");
  const [query, setQuery] = useState("");

  const term = fold(query.trim());

  /** Sections matching the chip, then items matching the search; empty sections drop out. */
  const groups: MenuGroup[] = useMemo(() => {
    const inSection = active === "all" ? menu : menu.filter((group) => group.id === active);
    if (!term) return inSection;

    return inSection
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => haystack(item, group.title).includes(term)),
      }))
      .filter((group) => group.items.length > 0);
  }, [active, term]);

  const count = groups.reduce((sum, group) => sum + group.items.length, 0);

  // Would widening to every section actually turn anything up?
  const matchesElsewhere =
    term.length > 0 &&
    active !== "all" &&
    menu.some((group) => group.items.some((item) => haystack(item, group.title).includes(term)));

  return (
    <>
      <div className="sticky top-[62px] z-40 border-b border-taupe/25 bg-cream/95 px-[clamp(20px,5vw,64px)] backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="no-scrollbar -mb-1 flex gap-[clamp(18px,3vw,42px)] overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActive(filter.id)}
                aria-pressed={active === filter.id}
                className={`shrink-0 border-b pb-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${
                  active === filter.id
                    ? "border-gold text-wine"
                    : "border-transparent text-taupe hover:text-wine"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-[300px]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-taupe"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.6-3.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dishes, drinks, ingredients"
              aria-label="Search the menu"
              className="w-full border border-taupe/40 bg-transparent py-2.5 pl-9 pr-9 text-[13px] font-light text-ink outline-none transition-colors duration-300 placeholder:text-taupe/80 focus:border-gold"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 font-serif text-xl leading-none text-taupe transition-colors hover:text-wine"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] pb-[clamp(80px,11vw,140px)] pt-[clamp(40px,6vw,72px)]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-[clamp(40px,6vw,92px)]">
          <p
            role="status"
            aria-live="polite"
            className="m-0 text-[10px] uppercase tracking-[0.3em] text-taupe"
          >
            {term
              ? `${count} ${count === 1 ? "result" : "results"} for “${query.trim()}”`
              : `${count} dishes`}
          </p>

          {count === 0 && (
            <div className="border border-taupe/25 px-6 py-14 text-center">
              <p className="m-0 font-serif text-[26px] font-light text-wine">
                Nothing on the menu matches &ldquo;{query.trim()}&rdquo;.
              </p>
              <p className="m-0 mt-3 text-[14px] font-light leading-[1.8] text-clay">
                {matchesElsewhere
                  ? "There are matches in other sections of the menu."
                  : "Try a dish, an ingredient, or a note like “vegetarian”."}
              </p>
              <button
                onClick={() => {
                  if (matchesElsewhere) setActive("all");
                  else setQuery("");
                }}
                className="mt-6 border-b border-gold pb-1 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-wine transition-colors hover:text-taupe"
              >
                {matchesElsewhere ? "Search the whole menu" : "Clear search"}
              </button>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {groups.map((group) => (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-9 flex items-baseline gap-5">
                  <h2 className="m-0 font-serif text-[clamp(30px,4vw,50px)] font-light text-wine">
                    {group.title}
                  </h2>
                  <span className="h-px flex-1 bg-taupe/35" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-taupe">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="grid gap-x-[clamp(30px,5vw,72px)] gap-y-2 lg:grid-cols-2">
                  {group.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}
                      className="flex min-w-0 items-start gap-4 border-b border-taupe/20 py-4.5 sm:gap-5"
                    >
                      <div className="size-[76px] shrink-0 overflow-hidden sm:size-[92px]">
                        <ImageSlot src={item.image} label={item.name} sizes="92px" />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="m-0 min-w-0 font-serif text-[19px] font-medium text-balance text-ink sm:text-[22px]">
                            <Highlight text={item.name} query={query} />
                          </h3>
                          <span className="hidden -translate-y-1 flex-1 border-b border-dotted border-taupe/55 sm:block" />
                          <span className="ml-auto shrink-0 text-[15px] text-wine sm:ml-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="m-0 text-[13.5px] font-light leading-[1.7] text-clay text-pretty">
                          <Highlight text={item.description} query={query} />
                        </p>
                        {item.tag && (
                          <span
                            className={`mt-1 self-start px-2.5 py-1 text-[9px] uppercase tracking-[0.24em] ${
                              item.featured
                                ? "bg-gold text-wine"
                                : "border border-taupe/40 text-taupe"
                            }`}
                          >
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
