import type { Metadata } from "next";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import Logo from "@/components/Logo";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story — AVANTI",
  description:
    "Seven years in Old Bodija: the room, the kitchen, and the people who keep AVANTI running.",
};

const chapters = [
  {
    year: "2019",
    title: "A room on Awolowo Avenue",
    body: "Forty-two seats, one wood grill and a wine list of eleven bottles. The first service ran an hour late and sold out anyway.",
  },
  {
    year: "2022",
    title: "The tasting room",
    body: "Twelve seats behind the pass, where the kitchen cooks whatever the morning market argued for. Booked out most weeks by Tuesday.",
  },
  {
    year: "2026",
    title: "Still the same fire",
    body: "New hands, same standard: pasta rolled daily, bread proved overnight, and nothing on the plate that has not earned its place.",
  },
];

const team = [
  {
    name: "Chidera Okoye",
    role: "Executive Chef",
    src: "/images/team-chidera.jpg",
    label: "Portrait of the executive chef",
  },
  {
    name: "Marco Vitale",
    role: "Head of Pastry",
    src: "/images/team-marco.jpg",
    label: "Portrait of the head of pastry",
  },
  {
    name: "Zainab Bello",
    role: "Restaurant Director",
    src: "/images/team-zainab.jpg",
    label: "Portrait of the restaurant director",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-wine px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,86px)] pt-[clamp(130px,17vw,190px)]">
        <div className="mx-auto max-w-[1240px]">
          <Logo variant="monogram" decorative className="mb-6 h-auto w-[92px]" />
          <p className="eyebrow m-0 mb-5 text-gold">Our story</p>
          <h1 className="m-0 mb-6 font-serif text-[clamp(46px,8.4vw,116px)] font-light leading-[0.95] text-ivory">
            Seven years,
            <br />
            <em>one standard.</em>
          </h1>
          <p className="m-0 max-w-[52ch] text-base font-light leading-[1.9] text-stone text-pretty">
            AVANTI began as a small European dining room in Ibadan and never tried to be anything
            else. What changed is the confidence &mdash; and the produce.
          </p>
        </div>
      </section>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,150px)]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-[clamp(36px,6vw,88px)] lg:grid-cols-2">
          <Reveal direction="left">
            <Parallax className="aspect-4/5" strength={26}>
              <ImageSlot
                src="/images/about-kitchen.jpg"
                label="The kitchen mid-service"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </Parallax>
          </Reveal>
          <Reveal>
            <p className="eyebrow m-0 mb-5 text-taupe">The kitchen</p>
            <h2 className="m-0 mb-6 font-serif text-[clamp(34px,5vw,66px)] font-light leading-[1.05] text-wine">
              Fire, butter,
              <br />
              <em>and patience.</em>
            </h2>
            <p className="m-0 mb-5 max-w-[54ch] text-base font-light leading-[1.9] text-cocoa text-pretty">
              Every sauce starts with a stock we made; every pasta is rolled the morning it is
              served. The grill is charcoal and wood, lit at ten and rested at midnight.
            </p>
            <p className="m-0 max-w-[54ch] text-[15px] font-light leading-[1.9] text-clay text-pretty">
              We buy small and often &mdash; fish from Eleyele, vegetables from Bodija market, cheese from a
              single importer who calls before he lands.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,140px)]">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-[clamp(40px,6vw,72px)]">
            <p className="eyebrow m-0 mb-4 text-taupe">Milestones</p>
            <h2 className="m-0 font-serif text-[clamp(34px,4.8vw,64px)] font-light leading-[1.05] text-wine">
              How the room <em>grew up.</em>
            </h2>
          </Reveal>
          <div className="grid gap-[clamp(24px,3vw,44px)] md:grid-cols-3">
            {chapters.map((chapter, i) => (
              <Reveal key={chapter.year} delay={i * 0.1}>
                <div className="h-full border-t border-taupe/40 pt-7">
                  <p className="m-0 font-serif text-[40px] leading-none text-gold">{chapter.year}</p>
                  <h3 className="m-0 mb-3 mt-4 font-serif text-[26px] font-normal text-wine">
                    {chapter.title}
                  </h3>
                  <p className="m-0 text-[14.5px] font-light leading-[1.85] text-cocoa text-pretty">
                    {chapter.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,140px)]">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-[clamp(40px,6vw,72px)]">
            <p className="eyebrow m-0 mb-4 text-taupe">The house</p>
            <h2 className="m-0 font-serif text-[clamp(34px,4.8vw,64px)] font-light leading-[1.05] text-wine">
              People you will <em>meet tonight.</em>
            </h2>
          </Reveal>
          <div className="grid gap-[clamp(18px,2.4vw,32px)] sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.09}>
                <div className="group">
                  <div className="aspect-4/5 overflow-hidden">
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <ImageSlot
                        src={member.src}
                        label={member.label}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <h3 className="m-0 mt-5 font-serif text-[24px] font-normal text-wine">
                    {member.name}
                  </h3>
                  <p className="m-0 mt-1.5 text-[10px] uppercase tracking-[0.26em] text-taupe">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand px-[clamp(20px,5vw,64px)] py-[clamp(80px,11vw,140px)] text-center">
        <Reveal className="mx-auto max-w-[760px]">
          <h2 className="m-0 mb-6 font-serif text-[clamp(34px,5.4vw,72px)] font-light leading-none text-wine">
            Come and see <em>for yourself.</em>
          </h2>
          <Link
            href="/contact"
            className="inline-block border border-wine bg-wine px-10 py-[19px] text-[11px] font-semibold uppercase tracking-[0.22em] text-linen transition-all duration-400 hover:border-gold hover:bg-gold hover:tracking-[0.3em] hover:text-wine"
          >
            Reserve a Table
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
