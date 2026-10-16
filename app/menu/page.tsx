import type { Metadata } from "next";
import Logo from "@/components/Logo";
import MenuBrowser from "@/components/MenuBrowser";

export const metadata: Metadata = {
  title: "The Menu — AVANTI",
  description:
    "Cocktails, mocktails, milkshakes and smoothies — with every ingredient listed.",
};

export default function MenuPage() {
  return (
    <main>
      <section className="bg-wine px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,86px)] pt-[clamp(130px,17vw,190px)]">
        <div className="mx-auto max-w-[1240px]">
          <Logo variant="monogram" decorative className="mb-6 h-auto w-[92px]" />
          <p className="eyebrow m-0 mb-5 text-gold">Drinks &middot; Bar</p>
          <h1 className="m-0 mb-6 font-serif text-[clamp(48px,9vw,124px)] font-light leading-[0.95] tracking-[0.02em] text-ivory">
            The Menu
          </h1>
          <p className="m-0 max-w-[52ch] text-base font-light leading-[1.9] text-stone text-pretty">
            Cocktails, mocktails, milkshakes and smoothies. Every ingredient is listed, and the bar is happy to adjust almost anything on request.
          </p>
        </div>
      </section>

      <MenuBrowser />
    </main>
  );
}
