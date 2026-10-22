import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import { whatsappHref, whatsappNumber } from "@/components/WhatsAppButton";
import ReservationForm from "@/components/ReservationForm";
import {
  BUSINESS_ADDRESS,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_HREF,
} from "@/lib/business";

export const metadata: Metadata = {
  title: "Reservations — AVANTI",
  description: `Reserve a table at AVANTI. Visit us at ${BUSINESS_ADDRESS} Open daily 12:00 – 23:00.`,
};

const details = [
  { label: "Address", lines: [BUSINESS_ADDRESS] },
  { label: "Hours", lines: ["Monday – Sunday", "12:00 – 23:00"] },
  { label: "Telephone", lines: [BUSINESS_PHONE_DISPLAY], href: BUSINESS_PHONE_HREF },
  { label: "WhatsApp", lines: [whatsappNumber], href: whatsappHref, external: true },
];

export default function ContactPage() {
  return (
    <main>
      <section className="bg-wine px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,86px)] pt-[clamp(130px,17vw,190px)]">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="eyebrow m-0 mb-5 text-gold">Reservations</p>
          <h1 className="m-0 mb-6 font-serif text-[clamp(46px,8.4vw,116px)] font-light leading-[0.95] text-ivory">
            Your table
            <br />
            <em>is waiting.</em>
          </h1>
          <p className="mx-auto m-0 max-w-[52ch] text-base font-light leading-[1.9] text-stone text-pretty">
            Fill in your details below, then send your request on WhatsApp for confirmation.
            For larger parties, please call us directly.
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
          </Reveal>
        </div>
      </section>
    </main>
  );
}
