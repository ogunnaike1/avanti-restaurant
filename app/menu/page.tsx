import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";

export const metadata: Metadata = {
  title: "The Menu — AVANTI",
  description:
    "Starters, soups, burgers, pasta and platters, with cocktails, mocktails, milkshakes, smoothies, wine and spirits at AVANTI Restaurant, Ibadan.",
};

export default function MenuPage() {
  return (
    <main>
      <section className="bg-wine px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,86px)] pt-[clamp(130px,17vw,190px)]">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="eyebrow m-0 mb-5 text-gold">Food &middot; Drinks &middot; Spirits</p>
          <h1 className="m-0 mb-6 font-serif text-[clamp(48px,9vw,124px)] font-light leading-[0.95] tracking-[0.02em] text-ivory">
            The Menu
          </h1>
          <p className="mx-auto m-0 max-w-[52ch] text-base font-light leading-[1.9] text-stone text-pretty">
            Starters, soups, salads, burgers, pasta, platters and desserts, with cocktails, mocktails, milkshakes, smoothies, wine and spirits. Prices are in naira.
          </p>
        </div>
      </section>

      <MenuBrowser />
    </main>
  );
}
