# AVANTI

Marketing site for AVANTI Ristorante — Next.js (App Router) + Tailwind CSS v4 + Framer Motion.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Home — hero slideshow, house intro, signature dishes, parallax feature, reservation CTA |
| `app/menu/page.tsx` | Menu — hero, photo strip, and the filterable `MenuBrowser` |
| `app/about/page.tsx` | Our story — kitchen, milestones, team |
| `app/contact/page.tsx` | Reservations — form plus house details |
| `app/logo-studio/page.tsx` | Identity showcase with a live palette switcher |
| `lib/menu.ts` | All menu copy and prices — the single source of truth |
| `components/` | `Nav`, `Footer`, `Hero`, `Reveal`, `Parallax`, `ImageSlot`, `MenuBrowser`, `ReservationForm`, `LogoStudio` |

## Design tokens

Colours and fonts live in the `@theme` block of `app/globals.css`, so `bg-wine`, `text-gold`,
`font-serif` etc. are available everywhere. Fonts are loaded with `next/font` (Cormorant Garamond
and Manrope) and wired to `--font-serif` / `--font-sans`.

## Images

Every photograph is an `<ImageSlot>` that renders a labelled placeholder until a real file exists.
To drop in artwork, pass `src`:

```tsx
<ImageSlot src="/images/dining-room.jpg" alt="The dining room" label="Dining room, wide" />
```

## Not wired up yet

`ReservationForm` validates and shows a confirmation state client-side; it does not post anywhere.
Point `handleSubmit` at a route handler (e.g. `app/api/reservations/route.ts`) when the booking
backend exists.
