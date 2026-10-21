import Link from "next/link";
import Hero from "@/components/Hero";
import ImageSlot from "@/components/ImageSlot";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import ReserveButton from "@/components/ReserveButton";
import { signatures } from "@/lib/menu";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(84px,12vw,160px)]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-[clamp(36px,6vw,88px)] lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow m-0 mb-5 text-taupe">Introduction</p>
            <h2 className="m-0 mb-7 font-serif text-[clamp(38px,5.4vw,74px)] font-light leading-[1.02] text-wine text-pretty">
              More than a meal.
              <br />
              <em className="font-light">A place to unwind.</em>
            </h2>
            <p className="m-0 mb-5 max-w-[54ch] text-base font-light leading-[1.9] text-cocoa text-pretty">
              Life moves quickly. Sometimes, the best thing you can do is slow down, settle in and
              enjoy where you are.
            </p>
            <p className="m-0 mb-5 max-w-[54ch] text-[15px] font-light leading-[1.9] text-clay text-pretty">
              At AVANTI, the experience extends beyond the table. From the details of our
              surroundings to the atmosphere that welcomes you in, every visit offers an
              opportunity to step away from the everyday and enjoy time well spent.
            </p>
            <p className="m-0 max-w-[54ch] font-serif text-[22px] italic leading-[1.5] text-wine text-pretty">
              Come for a meal. Stay for the conversations, the company and the moments that make
              the evening yours.
            </p>
          </Reveal>

          <Reveal direction="right" className="relative">
            <Parallax className="aspect-4/5" strength={26}>
              <ImageSlot
                src="/images/intro-dining-room.jpg"
                label="The dining room, wide"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone px-[clamp(20px,5vw,64px)] py-[clamp(84px,12vw,150px)]">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow m-0 mb-4 text-taupe">Signature drinks</p>
              <h2 className="m-0 font-serif text-[clamp(34px,4.8vw,64px)] font-light leading-[1.05] text-wine">
                Four pours that
                <br />
                <em>define the house.</em>
              </h2>
            </div>
            <Link
              href="/menu"
              className="border-b border-taupe pb-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-wine transition-colors duration-300 hover:border-gold hover:text-taupe"
            >
              View the full menu
            </Link>
          </Reveal>

          <div className="grid gap-[clamp(18px,2.4vw,32px)] sm:grid-cols-2 xl:grid-cols-4">
            {signatures.map((dish, i) => (
              <Reveal key={dish.id} delay={i * 0.09}>
                <article className="group h-full border border-taupe/20 bg-cream transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_26px_50px_-30px_rgba(63,13,12,.55)]">
                  <div className="aspect-4/5 overflow-hidden">
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <ImageSlot
                        src={dish.image}
                        label={dish.name}
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className="px-6 pb-7 pt-6">
                    <p className="m-0 mb-2.5 text-[9.5px] uppercase tracking-[0.26em] text-gold">
                      {dish.kicker}
                    </p>
                    <h3 className="m-0 mb-2.5 font-serif text-[27px] font-normal text-wine">
                      {dish.name}
                    </h3>
                    <p className="m-0 mb-4 text-[13.5px] font-light leading-[1.75] text-clay">
                      {dish.description}
                    </p>
                    <p className="m-0 text-[15px] tracking-[0.04em] text-taupe">{dish.price}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-wine">
        <Parallax className="absolute inset-0" strength={70}>
          <ImageSlot src="/images/experience-table.jpg" label="A table laid with linen and glassware" />
        </Parallax>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,rgba(20,2,5,.86) 0%,rgba(20,2,5,.6) 48%,rgba(20,2,5,.4) 100%)",
          }}
        />
        <Reveal className="relative mx-auto w-full max-w-[1240px] px-[clamp(20px,5vw,64px)] py-[clamp(80px,12vw,150px)]">
          <div className="max-w-[640px]">
            <p className="eyebrow m-0 mb-5 text-gold">The ambience</p>
            <h2 className="m-0 mb-6 font-serif text-[clamp(40px,6vw,86px)] font-light leading-none text-ivory">
              Take a moment.
              <br />
              <em>Look around.</em>
            </h2>
            <p className="m-0 mb-9 max-w-[48ch] text-base font-light leading-[1.9] text-stone text-pretty">
              Sometimes, it is the little details that make a place unforgettable. At AVANTI, the
              surroundings are part of the experience. Take in the atmosphere, enjoy the
              distinctive presence of our aquarium and give yourself permission to slow down.
            </p>
            <p className="m-0 mb-9 max-w-[48ch] text-base font-light leading-[1.9] text-stone text-pretty">
              Whether you&apos;re sharing a quiet dinner, catching up with friends or enjoying time
              with family, AVANTI offers a setting designed to be experienced, not rushed.
            </p>
            <Link
              href="/about"
              className="inline-block border border-gold/60 px-[34px] py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition-colors duration-400 hover:bg-gold hover:text-wine"
            >
              Discover AVANTI
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(90px,13vw,170px)] text-center">
        <Reveal className="mx-auto max-w-[900px]">
          <p className="eyebrow m-0 mb-6 text-taupe">The menu</p>
          <h2 className="m-0 mb-6 font-serif text-[clamp(40px,7vw,96px)] font-light leading-none text-wine">
            Something to
            <br />
            <em>look forward to.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-[48ch] text-base font-light leading-[1.9] text-clay">
            Good food has a way of bringing people together. Explore a menu that brings Nigerian
            and international cuisine to the table, with something to look forward to as you
            settle in and enjoy the experience.
          </p>
          <p className="mx-auto mb-10 max-w-[48ch] font-serif text-xl italic text-wine">
            Come curious. Find your favourites. Make a meal of it.
          </p>
          <Link
            href="/menu"
            className="inline-block border border-wine bg-wine px-10 py-[19px] text-[11px] font-semibold uppercase tracking-[0.22em] text-linen transition-all duration-400 hover:border-gold hover:bg-gold hover:tracking-[0.3em] hover:text-wine"
          >
            Explore Our Menu
          </Link>
        </Reveal>
      </section>

      <section className="bg-sand px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,140px)] text-center">
        <Reveal className="mx-auto max-w-[820px]">
          <p className="eyebrow m-0 mb-6 text-clay">Your occasion</p>
          <h2 className="m-0 mb-6 font-serif text-[clamp(36px,5.6vw,78px)] font-light leading-none text-wine">
            However you come,
            <br />
            <em>make it a moment.</em>
          </h2>
          <p className="mx-auto mb-5 max-w-[48ch] font-serif text-xl italic text-wine">
            Not every memorable evening needs a reason.
          </p>
          <p className="mx-auto mb-5 max-w-[52ch] text-base font-light leading-[1.9] text-cocoa text-pretty">
            Perhaps it&apos;s a date night. A birthday. A long overdue catch-up with friends. A
            family dinner. Or simply the desire to enjoy somewhere different.
          </p>
          <p className="mx-auto max-w-[52ch] text-base font-light leading-[1.9] text-cocoa text-pretty">
            Whatever brings you to AVANTI, there&apos;s room to make the moment your own.
          </p>
        </Reveal>
      </section>

      <section className="bg-wine px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,140px)] text-center">
        <Reveal className="mx-auto max-w-[820px]">
          <h2 className="m-0 mb-6 font-serif text-[clamp(38px,5.6vw,78px)] font-light leading-none text-ivory">
            Your time at AVANTI
            <br />
            <em>awaits.</em>
          </h2>
          <p className="mx-auto mb-4 max-w-[48ch] font-serif text-xl italic text-linen">
            Good food. A beautiful setting. Time with your favourite people.
          </p>
          <p className="mx-auto mb-3 max-w-[48ch] text-base font-light leading-[1.9] text-stone">
            Make space for an experience worth remembering.
          </p>
          <p className="mx-auto mb-10 max-w-[48ch] text-base font-light leading-[1.9] text-stone">
            We look forward to welcoming you to AVANTI Fine Dining, Ibadan.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <ReserveButton className="border border-gold bg-gold px-[34px] py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-wine transition-colors duration-400 hover:bg-transparent hover:text-gold">
              Reserve Your Table
            </ReserveButton>
            <Link
              href="/contact"
              className="inline-flex items-center border border-cream/45 px-[34px] py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition-colors duration-400 hover:border-cream hover:bg-cream hover:text-wine"
            >
              Find Us
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
