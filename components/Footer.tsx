import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-wine px-[clamp(20px,5vw,64px)] pb-10 pt-[clamp(64px,9vw,110px)] text-stone">
      <div className="mx-auto grid max-w-[1240px] gap-[clamp(36px,5vw,72px)] md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="stacked" className="h-auto w-[min(260px,72%)]" />
          <p className="mt-6 max-w-[38ch] text-[15px] font-light leading-[1.9] text-stone/80">
            A modern classic in Old Bodija — where timeless flavours meet contemporary
            elegance, nightly from noon until eleven.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-5 text-taupe">Visit</p>
          <p className="text-[15px] font-light leading-[1.9] text-stone/85">
            14 Awolowo Avenue
            <br />
            Old Bodija, Ibadan
          </p>
          <a href="tel:+2348012345678" className="mt-4 block text-[15px] text-gold">
            +234 801 234 5678
          </a>
          <a href="mailto:reservations@avanti.ng" className="block text-[15px] text-gold">
            reservations@avanti.ng
          </a>
        </div>

        <div>
          <p className="eyebrow mb-5 text-taupe">Explore</p>
          <nav className="flex flex-col gap-2.5 text-[15px] font-light">
            <Link href="/menu" className="text-stone/85 hover:text-gold">The menu</Link>
            <Link href="/about" className="text-stone/85 hover:text-gold">Our story</Link>
            <Link href="/contact" className="text-stone/85 hover:text-gold">Reservations</Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(48px,7vw,88px)] flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-taupe/30 pt-7">
        <p className="m-0 text-[10px] uppercase tracking-[0.26em] text-taupe">
          &copy; {new Date().getFullYear()} Avanti Ristorante
        </p>
        <p className="m-0 text-[10px] uppercase tracking-[0.26em] text-taupe">
          Ibadan &middot; Est. 2019
        </p>
      </div>
    </footer>
  );
}
