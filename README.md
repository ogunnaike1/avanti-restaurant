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
| `lib/menu.ts` | All menu copy and prices — the single source of truth |
| `components/Logo.tsx` | The mark — stacked signature, wordmark and monogram, all cropped from one artwork |
| `components/` | `Nav`, `Footer`, `Hero`, `Reveal`, `Parallax`, `ImageSlot`, `MenuBrowser`, `ReservationForm` |

## The mark

The supplied AVANTI artwork lives in `public/` as three prepared PNGs, rendered through `<Logo>`:

```tsx
<Logo variant="stacked" priority />  // monogram over wordmark — hero, footer
<Logo variant="wordmark" />          // horizontal, for tight spaces — header, drawer
<Logo variant="monogram" />          // the swash A — page heroes, booking confirmation
```

All three are crops of the **same** file (`logo1.jpeg`), so the wordmark in the header is the same
drawing as the mark in the hero — never introduce a second piece of logo art.

**The mark only works on wine.** Its gold is bevelled, and the shadow side of every letter is the
same maroon as its ground, so the ground cannot be keyed out without gouging the letterforms. Each
file therefore keeps its ground and feathers away at the edges; `--color-wine` is tuned to the
artwork's own ground (`#380109`) so those edges disappear. Never place the mark on cream — that is
why the header turns wine rather than cream on scroll.

To regenerate the files from new artwork, adapt `scripts/prep-logo.js` (crop, pad, feather) and
re-run it (`node scripts/prep-logo.js <artwork>`); it also writes `app/icon.png`, the favicon.

## Design tokens

Colours and fonts live in the `@theme` block of `app/globals.css`, so `bg-wine`, `text-gold`,
`font-serif` etc. are available everywhere. Fonts are loaded with `next/font` (Cormorant Garamond
and Manrope) and wired to `--font-serif` / `--font-sans`.

## Images

Photography lives in `public/images/` and is rendered through `<ImageSlot>`, which fills whatever
box the caller gives it (so the page keeps control of the aspect ratio) and falls back to a labelled
placeholder whenever `src` is absent:

```tsx
<ImageSlot
  src="/images/hero-dining-room.jpg"
  label="The dining room, laid for service"   // also the alt text
  sizes="(max-width: 1024px) 100vw, 45vw"
  priority                                     // above-the-fold only
/>
```

| File | Where it appears |
| --- | --- |
| `hero-dining-room`, `hero-plated-dish`, `hero-chef-pass`, `hero-evening-bar` | Home hero slideshow |
| `intro-dining-room` | Home — "More than a meal" |
| `dish-risotto`, `dish-ribeye`, `dish-linguine`, `dish-fondant` | Home — signature dish cards (paths live in `lib/menu.ts`) |
| `experience-table` | Home — full-bleed parallax band |
| `menu-burrata`, `menu-seabass`, `menu-negroni` | Menu — photo strip |
| `about-kitchen`, `team-chidera`, `team-marco`, `team-zainab` | About — kitchen and team |
| `contact-entrance` | Contact — beside the reservation form |

These are stock placeholders from Unsplash (free to use, attribution not required) picked to match
the wine-and-gold palette. Swap in the restaurant's own photography by replacing the files — keep
the names and nothing else has to change.

## Not wired up yet

`ReservationForm` validates and shows a confirmation state client-side; it does not post anywhere.
Point `handleSubmit` at a route handler (e.g. `app/api/reservations/route.ts`) when the booking
backend exists.
