"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menu, type MenuGroup } from "@/lib/menu";

const filters = [
  { id: "all", label: "All" },
  ...menu.map((group) => ({ id: group.id, label: group.title.split(" ")[0] })),
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function MenuBrowser() {
  const [active, setActive] = useState<FilterId>("all");

  const groups: MenuGroup[] = useMemo(
    () => (active === "all" ? menu : menu.filter((group) => group.id === active)),
    [active],
  );

  return (
    <>
      <div className="sticky top-[62px] z-40 border-b border-taupe/25 bg-cream/95 px-[clamp(20px,5vw,64px)] backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-[1240px] gap-[clamp(18px,3vw,42px)] overflow-x-auto py-5.5">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActive(filter.id)}
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
      </div>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] pb-[clamp(80px,11vw,140px)] pt-[clamp(56px,8vw,100px)]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-[clamp(52px,7vw,92px)]">
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
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}
                      className="flex flex-col gap-1.5 border-b border-taupe/20 py-4.5"
                    >
                      <div className="flex items-baseline gap-3">
                        <h3 className="m-0 font-serif text-[22px] font-medium text-ink">
                          {item.name}
                        </h3>
                        <span className="-translate-y-1 flex-1 border-b border-dotted border-taupe/55" />
                        <span className="text-[15px] text-wine">{item.price}</span>
                      </div>
                      <p className="m-0 text-[13.5px] font-light leading-[1.7] text-clay">
                        {item.description}
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
