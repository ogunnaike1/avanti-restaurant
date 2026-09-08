import type { Metadata } from "next";
import LogoStudio from "@/components/LogoStudio";

export const metadata: Metadata = {
  title: "Logo Studio — AVANTI",
  description: "The AVANTI identity: wordmark, monogram, stacked lockup and house seal.",
};

export default function LogoStudioPage() {
  return (
    <main>
      <section className="bg-wine px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,86px)] pt-[clamp(130px,17vw,190px)]">
        <div className="mx-auto max-w-[1240px]">
          <p className="eyebrow m-0 mb-5 text-gold">Identity</p>
          <h1 className="m-0 mb-6 font-serif text-[clamp(46px,8.4vw,116px)] font-light leading-[0.95] text-ivory">
            Logo <em>studio.</em>
          </h1>
          <p className="m-0 max-w-[52ch] text-base font-light leading-[1.9] text-stone text-pretty">
            Four lockups, one voice. Switch the palette to see how the mark behaves on signage,
            print and plate.
          </p>
        </div>
      </section>

      <LogoStudio />
    </main>
  );
}
