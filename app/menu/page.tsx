import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import MenuBrowser from "@/components/MenuBrowser";

export const metadata: Metadata = {
  title: "The Menu — AVANTI",
  description:
    "Starters, mains, grills, desserts and drinks — written each morning, cooked over fire and butter.",
};

const photos = [
  { id: "av-menu-1", label: "Starter, close crop", caption: "Burrata & heirloom tomatoes" },
  { id: "av-menu-2", label: "Main course, overhead", caption: "Pan-seared sea bass" },
  { id: "av-menu-3", label: "Cocktail on the bar", caption: "The Avanti negroni" },
];

export default function MenuPage() {
  return (
    <main>
      <section className="bg-wine px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,86px)] pt-[clamp(130px,17vw,190px)]">
        <div className="mx-auto max-w-[1240px]">
          <p className="eyebrow m-0 mb-5 text-gold">Dinner &middot; served 12:00 &ndash; 23:00</p>
          <h1 className="m-0 mb-6 font-serif text-[clamp(48px,9vw,124px)] font-light leading-[0.95] tracking-[0.02em] text-ivory">
            The Menu
          </h1>
          <p className="m-0 max-w-[52ch] text-base font-light leading-[1.9] text-stone text-pretty">
            Written each morning, cooked over fire and butter. Dietary notes are marked; the kitchen
            is happy to adjust almost anything with notice.
          </p>
        </div>
      </section>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] pt-[clamp(40px,6vw,72px)]">
        <div className="mx-auto grid max-w-[1240px] gap-[clamp(16px,2vw,26px)] sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <figure key={photo.id} className="m-0">
              <div className="aspect-3/2 overflow-hidden">
                <ImageSlot label={photo.label} />
              </div>
              <figcaption className="mt-3 text-[10px] uppercase tracking-[0.26em] text-taupe">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <MenuBrowser />
    </main>
  );
}
