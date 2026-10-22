import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import ReserveButton from "@/components/ReserveButton";

export const metadata: Metadata = {
  title: "About — AVANTI",
  description:
    "Discover AVANTI Fine Dining in Akobo, Ibadan: exceptional surroundings, Nigerian and international cuisine, and time well spent.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-wine px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,86px)] pt-[clamp(130px,17vw,190px)]">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="eyebrow m-0 mb-5 text-gold">About AVANTI</p>
          <h1 className="m-0 mb-6 font-serif text-[clamp(46px,8.4vw,116px)] font-light leading-[0.95] text-ivory">
            A place to be.
            <br />
            <em>A moment to savour.</em>
          </h1>
          <p className="mx-auto m-0 max-w-[52ch] text-base font-light leading-[1.9] text-stone text-pretty">
            AVANTI Fine Dining, Ibadan, is a place to slow down, settle in and enjoy time well spent
            with the people who matter. We celebrate the art of good food, refined living and the
            joy of togetherness.
          </p>
        </div>
      </section>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,150px)]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-[clamp(36px,6vw,88px)] lg:grid-cols-2">
          <Reveal direction="left">
            <Parallax className="aspect-4/5" strength={26}>
              <ImageSlot
                src="/images/intro-dining-room.jpg"
                label="The dining room"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </Parallax>
          </Reveal>
          <Reveal>
            <p className="eyebrow m-0 mb-5 text-taupe">The place</p>
            <h2 className="m-0 mb-6 font-serif text-[clamp(34px,5vw,66px)] font-light leading-[1.05] text-wine">
              More than a meal.
              <br />
              <em>A place to unwind.</em>
            </h2>
            <p className="m-0 mb-5 max-w-[54ch] text-base font-light leading-[1.9] text-cocoa text-pretty">
              At AVANTI, the experience extends beyond the table. From the details of our
              surroundings to the atmosphere that welcomes you in, every visit offers an
              opportunity to step away from the everyday.
            </p>
            <p className="m-0 max-w-[54ch] text-[15px] font-light leading-[1.9] text-clay text-pretty">
              Take in the atmosphere, enjoy the distinctive presence of our aquarium and give
              yourself permission to slow down.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,140px)] text-center">
        <Reveal className="mx-auto max-w-[760px]">
          <p className="eyebrow m-0 mb-4 text-taupe">The cuisine</p>
          <h2 className="m-0 mb-6 font-serif text-[clamp(34px,4.8vw,64px)] font-light leading-[1.05] text-wine">
            Nigerian and international, <em>side by side.</em>
          </h2>
          <p className="mx-auto max-w-[52ch] text-base font-light leading-[1.9] text-cocoa text-pretty">
            Good food has a way of bringing people together. Whether you&apos;re sharing a quiet
            dinner, catching up with friends or enjoying time with family, AVANTI offers a setting
            designed to be experienced, not rushed.
          </p>
        </Reveal>
      </section>

      <section className="bg-sand px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,140px)] text-center">
        <Reveal className="mx-auto max-w-[760px]">
          <h2 className="m-0 mb-6 font-serif text-[clamp(34px,5.4vw,72px)] font-light leading-none text-wine">
            Your time at AVANTI <em>awaits.</em>
          </h2>
          <ReserveButton className="inline-block border border-wine bg-wine px-10 py-[19px] text-[11px] font-semibold uppercase tracking-[0.22em] text-linen transition-all duration-400 hover:border-gold hover:bg-gold hover:tracking-[0.3em] hover:text-wine">
            Reserve Your Table
          </ReserveButton>
        </Reveal>
      </section>
    </main>
  );
}
