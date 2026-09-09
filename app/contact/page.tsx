import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { whatsappHref, whatsappNumber } from "@/components/WhatsAppButton";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Reservations — AVANTI",
  description: "Reserve a table at AVANTI, Old Bodija, Ibadan. Served nightly 12:00 – 23:00.",
};

const details = [
  { label: "Address", lines: ["14 Awolowo Avenue", "Old Bodija, Ibadan"] },
  { label: "Hours", lines: ["Monday – Sunday", "12:00 – 23:00"] },
  { label: "Telephone", lines: ["+234 801 234 5678"], href: "tel:+2348012345678" },
  { label: "WhatsApp", lines: [whatsappNumber], href: whatsappHref, external: true },
  { label: "Email", lines: ["reservations@avanti.ng"], href: "mailto:reservations@avanti.ng" },
];

export default function ContactPage() {
  return (
    <main>
      <section className="bg-wine px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,86px)] pt-[clamp(130px,17vw,190px)]">
        <div className="mx-auto max-w-[1240px]">
          <Logo variant="monogram" decorative className="mb-6 h-auto w-[92px]" />
          <p className="eyebrow m-0 mb-5 text-gold">Reservations</p>
          <h1 className="m-0 mb-6 font-serif text-[clamp(46px,8.4vw,116px)] font-light leading-[0.95] text-ivory">
            Your table
            <br />
            <em>is waiting.</em>
          </h1>
          <p className="m-0 max-w-[52ch] text-base font-light leading-[1.9] text-stone text-pretty">
            Request a table below and the house will confirm by phone. For the tasting room or
            parties of eight or more, please call us directly.
          </p>
        </div>
      </section>

      <section className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(70px,10vw,130px)]">
        <div className="mx-auto grid max-w-[1240px] gap-[clamp(40px,6vw,88px)] lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <ReservationForm />
          </Reveal>

          <Reveal direction="right" className="flex flex-col gap-9">
            <div className="aspect-3/2 overflow-hidden">
              <ImageSlot
                src="/images/contact-entrance.jpg"
                label="The room, seen from the entrance"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              {details.map((detail) => (
                <div key={detail.label}>
                  <p className="eyebrow m-0 mb-3 text-taupe">{detail.label}</p>
                  {detail.lines.map((line) =>
                    detail.href ? (
                      <a
                        key={line}
                        href={detail.href}
                        target={detail.external ? "_blank" : undefined}
                        rel={detail.external ? "noopener noreferrer" : undefined}
                        className="block text-[15px] font-light leading-[1.8] text-wine hover:text-gold"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="m-0 text-[15px] font-light leading-[1.8] text-cocoa">
                        {line}
                      </p>
                    ),
                  )}
                </div>
              ))}
            </div>
            <div className="border border-taupe/30 px-6 py-6">
              <p className="eyebrow m-0 mb-3 text-taupe">Private dining</p>
              <p className="m-0 text-[14.5px] font-light leading-[1.85] text-cocoa text-pretty">
                The tasting room seats twelve, with a set menu written the morning of your booking.
                Email the house at least a week ahead.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
