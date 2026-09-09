import Link from "next/link";
import Hero from "@/components/Hero";
import ImageSlot from "@/components/ImageSlot";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import ReserveButton from "@/components/ReserveButton";
import { signatures } from "@/lib/menu";

const stats = [
  { value: "07", label: "Years open" },
  { value: "42", label: "Seats nightly" },
  { value: "01", label: "Tasting room" },
];

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(84px,12vw,160px)]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-[clamp(36px,6vw,88px)] lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow m-0 mb-5 text-taupe">The house</p>
            <h2 className="m-0 mb-7 font-serif text-[clamp(38px,5.4vw,74px)] font-light leading-[1.02] text-wine text-pretty">
              More than a meal.
              <br />
              <em className="font-light">An experience.</em>
            </h2>
            <p className="m-0 mb-5 max-w-[54ch] text-base font-light leading-[1.9] text-cocoa text-pretty">
              AVANTI is a dining room in the old European sense &mdash; low light, linen, a fire in
              the kitchen &mdash; rebuilt for the way Ibadan eats now. Produce arrives each morning;
              the menu answers to it.
            </p>
            <p className="m-0 mb-9 max-w-[54ch] text-[15px] font-light leading-[1.9] text-clay text-pretty">
              Everything here is made in-house: the pasta, the bread, the ice in your glass. What we
              cannot make beautifully, we do not serve.
            </p>
            <div className="flex flex-wrap gap-11 border-t border-taupe/30 pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="m-0 font-serif text-[40px] leading-none text-gold">{stat.value}</p>
                  <p className="eyebrow mt-1.5 tracking-[0.24em] text-taupe">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" className="relative">
            <Parallax className="aspect-4/5" strength={26}>
              <ImageSlot
                src="/images/intro-dining-room.jpg"
                label="The dining room, wide"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </Parallax>
            <div className="absolute -bottom-[18px] -left-[18px] max-w-[60%] bg-wine px-6 py-5">
              <p className="m-0 font-serif text-[19px] italic leading-[1.4] text-linen">
                &ldquo;A room that knows exactly what it is.&rdquo;
              </p>
              <p className="m-0 mt-2.5 text-[9.5px] uppercase tracking-[0.26em] text-gold">
                Guardian Life
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone px-[clamp(20px,5vw,64px)] py-[clamp(84px,12vw,150px)]">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow m-0 mb-4 text-taupe">Signature dishes</p>
              <h2 className="m-0 font-serif text-[clamp(34px,4.8vw,64px)] font-light leading-[1.05] text-wine">
                Four plates that
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
            <p className="eyebrow m-0 mb-5 text-gold">The AVANTI experience</p>
            <h2 className="m-0 mb-6 font-serif text-[clamp(40px,6vw,86px)] font-light leading-none text-ivory">
              Where every
              <br />
              <em>detail matters.</em>
            </h2>
            <p className="m-0 mb-9 max-w-[48ch] text-base font-light leading-[1.9] text-stone text-pretty">
              From the weight of the glassware to the last pour of the evening, the room is composed
              like a menu &mdash; deliberately, and in your favour.
            </p>
            <Link
              href="/about"
              className="inline-block border border-gold/60 px-[34px] py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition-colors duration-400 hover:bg-gold hover:text-wine"
            >
              Our Story
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(90px,13vw,170px)] text-center">
        <Reveal className="mx-auto max-w-[900px]">
          <p className="eyebrow m-0 mb-6 text-taupe">The menu</p>
          <h2 className="m-0 mb-6 font-serif text-[clamp(40px,7vw,96px)] font-light leading-none text-wine">
            Come hungry.
            <br />
            <em>Leave inspired.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-[48ch] text-base font-light leading-[1.9] text-clay">
            Five courses, one wine list, and a kitchen that changes its mind with the seasons.
          </p>
          <Link
            href="/menu"
            className="inline-block border border-wine bg-wine px-10 py-[19px] text-[11px] font-semibold uppercase tracking-[0.22em] text-linen transition-all duration-400 hover:border-gold hover:bg-gold hover:tracking-[0.3em] hover:text-wine"
          >
            Explore Full Menu
          </Link>
        </Reveal>
      </section>

      <section className="bg-sand px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,140px)]">
        <Reveal className="mx-auto grid max-w-[1240px] items-center gap-[clamp(30px,5vw,70px)] lg:grid-cols-2">
          <div>
            <p className="eyebrow m-0 mb-5 text-clay">Reservations</p>
            <h2 className="m-0 font-serif text-[clamp(38px,5.6vw,78px)] font-light leading-none text-wine">
              Your table
              <br />
              <em>is waiting.</em>
            </h2>
          </div>
          <div>
            <p className="m-0 mb-7 max-w-[44ch] text-base font-light leading-[1.9] text-cocoa">
              Dinner is served nightly from 12:00 until 23:00. For parties of eight or more, or for
              the tasting room, call the house directly.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <ReserveButton className="border border-wine bg-wine px-[34px] py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-linen transition-colors duration-400 hover:border-gold hover:bg-gold hover:text-wine">
                Reserve a Table
              </ReserveButton>
              <a
                href="tel:+2348012345678"
                className="inline-flex items-center border border-wine/35 px-[34px] py-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-wine transition-colors duration-400 hover:border-wine"
              >
                +234 801 234 5678
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
