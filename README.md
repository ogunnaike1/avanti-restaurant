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
| `app/menu/page.tsx` | Menu — hero, photo strip, and `MenuBrowser` (search + section filters) |
| `app/about/page.tsx` | Our story — kitchen, milestones, team |
| `app/contact/page.tsx` | Reservations — form plus house details |
| `lib/menu.ts` | All menu copy and prices — the single source of truth |
| `components/Logo.tsx` | The mark — stacked signature, wordmark and monogram, all cropped from one artwork |
| `components/` | `Nav`, `Footer`, `Hero`, `Reveal`, `Parallax`, `ImageSlot`, `MenuBrowser` |
| `components/Reservation*` | `ReservationProvider` (context), `ReserveButton` (trigger), `ReservationModal` (dialog), `ReservationForm` (shared by the dialog and `/contact`) |
| `app/api/reservations/route.ts` | POST endpoint that validates and records a booking |

## The mark

The supplied AVANTI artwork lives in `public/` as three prepared PNGs, rendered through `<Logo>`:

```tsx
<Logo variant="stacked" priority />  // monogram over wordmark — header, hero, drawer, footer
<Logo variant="wordmark" />          // horizontal, for tight spaces
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

## Menu search

`MenuBrowser` filters the menu client-side as you type — there is no index or API behind it, the
whole menu is 24 items in `lib/menu.ts`. It matches names, descriptions, dietary tags and section
titles, folding case and accents (`veloute` finds *Velouté*, `creme` finds *Crème*), and marks the
matched run in gold. The search and the section chips combine; when a search has matches only
outside the chosen section, the empty state offers to widen to the whole menu.

One constraint worth keeping: **the list must not depend on exit animations.** An earlier version
wrapped the sections in `AnimatePresence` and filtered-out rows never left the DOM — the page
reported "0 results" while still showing all 24 dishes. Sections and items now unmount outright and
animate only on mount.

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
| `menu-burrata`, `menu-seabass`, `menu-negroni` | Menu — photo strip, and the matching item rows |
| `item-*` | Menu — one thumbnail per dish (paths live in `lib/menu.ts`; shown at every breakpoint) |
| `about-kitchen`, `team-chidera`, `team-marco`, `team-zainab` | About — kitchen and team |
| `contact-entrance` | Contact — beside the reservation form |

These are stock placeholders from Unsplash (free to use, attribution not required) picked to match
the wine-and-gold palette. Swap in the restaurant's own photography by replacing the files — keep
the names and nothing else has to change.

## Reservations

Every "Reserve a Table" button is a `<ReserveButton>`, which raises the booking dialog through the
context in `ReservationProvider` (mounted once in the root layout). The dialog traps Tab, closes on
Escape or a backdrop click, locks body scroll, and restores focus to whatever opened it. The same
`ReservationForm` renders inside the dialog and inline on `/contact`.

Submitting POSTs JSON to `/api/reservations`, which validates server-side (name, email shape, phone
digits, a date that is not in the past, a known sitting and party size), appends the booking to
`.data/reservations.json`, logs a line, and returns a short reference like `AV-7A83` that the
confirmation screen shows back to the guest. Field errors come back as `{ errors: { field: msg } }`
with a 400 and render under the offending inputs.

**To take real bookings**, replace the two file calls in `save()` with a database write and an email
to the house — the file store assumes one long-running server, so it will not survive a serverless
deploy. `.data/` is gitignored.

**One rule to keep**: the confirmation screen and the dialog's dismissal must never be gated on a
Framer Motion `exit` animation. An earlier version wrapped both in `AnimatePresence`, and when those
exit animations stalled the booking was saved on the server while the form sat there unchanged.
Both now mount and unmount outright, animating only on entry.
