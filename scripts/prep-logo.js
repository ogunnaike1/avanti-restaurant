/*
 * Prepares the supplied AVANTI artwork for the site.
 *
 * The gold is bevelled, and the shadow side of every letter is the same maroon as
 * the ground — so cutting the background out gouges holes in the letterforms. The
 * art has to keep its own ground. So instead: crop tight to the mark, subtract the
 * maroon so the ground reads as black, then turn that black into transparency —
 * alpha becomes the pixel's brightness and the colour is unpremultiplied back up.
 * That composites like a screen blend but is plain alpha, so it survives inside the
 * animated (stacking-context-creating) parents the mark sits in, and the art drops
 * onto photographs and flat wine alike with no visible tile.
 */
const GROUND = [56, 6, 12];
const sharp = require("sharp");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

// Source artwork, overridable: node scripts/prep-logo.js <artwork>
const [artwork] = process.argv.slice(2);

/** Bounding box of the gold: the maroon ground has almost no green in it. */
async function contentBox(src, crop) {
  let pipe = sharp(src);
  if (crop) pipe = pipe.extract(crop);
  const { data, info } = await pipe.removeAlpha().raw().toBuffer({ resolveWithObject: true });

  let top = info.height, left = info.width, right = 0, bottom = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 3 + 1] > 26) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  return { left, top, width: right - left + 1, height: bottom - top + 1, info };
}

const smooth = (t) => t * t * (3 - 2 * t);

async function build(src, out, { crop, pad = 0.07, feather = 0.13, width } = {}) {
  const box = await contentBox(src, crop);
  const base = crop ?? { left: 0, top: 0, width: box.info.width, height: box.info.height };

  const padX = Math.round(box.width * pad);
  const padY = Math.round(box.height * pad);
  const region = {
    left: Math.max(0, base.left + box.left - padX),
    top: Math.max(0, base.top + box.top - padY),
    width: 0,
    height: 0,
  };
  const meta = await sharp(src).metadata();
  region.width = Math.min(meta.width - region.left, box.width + padX * 2);
  region.height = Math.min(meta.height - region.top, box.height + padY * 2);

  let pipe = sharp(src).extract(region);
  if (width) pipe = pipe.resize({ width, withoutEnlargement: true });

  const { data, info } = await pipe.removeAlpha().raw().toBuffer({ resolveWithObject: true });

  // Push the maroon ground down to black, keeping the gold.
  for (let i = 0; i < data.length; i += 3) {
    for (let c = 0; c < 3; c++) {
      data[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - GROUND[c]) * 1.08)));
    }
  }

  // Black to alpha: brightness becomes coverage, colour is unpremultiplied.
  const coverage = Buffer.alloc(info.width * info.height);
  const FLOOR = 12; // JPEG noise in the ground, which would otherwise haze the page
  for (let i = 0, p = 0; i < data.length; i += 3, p++) {
    const m = Math.max(data[i], data[i + 1], data[i + 2]);
    coverage[p] = m <= FLOOR ? 0 : Math.round(((m - FLOOR) * 255) / (255 - FLOOR));
    if (m > 0) {
      for (let c = 0; c < 3; c++) {
        data[i + c] = Math.min(255, Math.round((data[i + c] * 255) / m));
      }
    }
  }

  // Alpha ramps to zero across the outer band on every side.
  const fx = Math.max(1, Math.round(info.width * feather));
  const fy = Math.max(1, Math.round(info.height * feather));
  const alpha = Buffer.alloc(info.width * info.height);
  for (let y = 0; y < info.height; y++) {
    const ay = smooth(Math.min(1, Math.min(y, info.height - 1 - y) / fy));
    for (let x = 0; x < info.width; x++) {
      const ax = smooth(Math.min(1, Math.min(x, info.width - 1 - x) / fx));
      const p = y * info.width + x;
      alpha[p] = Math.round(Math.min(ax, ay) * coverage[p]);
    }
  }

  // What colour the page must be for the feathered edge to disappear.
  let br = 0, bg = 0, bb = 0, n = 0;
  for (let x = 0; x < info.width; x++) {
    for (const y of [0, info.height - 1]) {
      const i = (y * info.width + x) * 3;
      br += data[i]; bg += data[i + 1]; bb += data[i + 2]; n++;
    }
  }
  const hex = (v) => Math.round(v / n).toString(16).padStart(2, "0");
  console.log("  edge colour:", `#${hex(br)}${hex(bg)}${hex(bb)}`);

  const written = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 3 },
  })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, out));

  console.log(out, `${written.width}x${written.height}`);
}

(async () => {
  // One source of truth: every lockup is cropped from the same artwork, so the
  // wordmark in the header is the same drawing as the mark in the hero.
  const src = artwork ?? "c:/Users/usman/Downloads/logo1.jpeg";

  // Full stacked signature: monogram over wordmark.
  await build(src, "avanti-stacked.png", { width: 1000, pad: 0.12, feather: 0.14 });

  // Just the AVANTI line, for the header — at that height the descriptor of the
  // full lockup would be an illegible smudge.
  await build(src, "avanti-wordmark.png", {
    crop: { left: 120, top: 615, width: 1020, height: 215 },
    width: 1000,
    pad: 0.05,
    feather: 0.08,
  });

  // The swash A alone.
  await build(src, "avanti-monogram.png", {
    crop: { left: 380, top: 190, width: 540, height: 450 },
    width: 512,
    pad: 0.14,
    feather: 0.16,
  });

  /*
   * App icons. These keep a solid wine ground on purpose: iOS composites an
   * "Add to Home Screen" icon onto black, so a transparent PNG would show the
   * mark floating on a black tile. Full-bleed square — iOS rounds the corners
   * itself, and Android masks it.
   */
  const tile = async (size, out, markScale = 0.68) => {
    // The prepared monogram, not a raw crop: it is already keyed to transparency,
    // so it sits on the wine ground without a visible tile of its own.
    const mark = await sharp(path.join(PUBLIC, "avanti-monogram.png"))
      .resize({ width: Math.round(size * markScale), fit: "inside" })
      .toBuffer();

    await sharp({
      create: { width: size, height: size, channels: 4, background: "#380109" },
    })
      .composite([{ input: mark, gravity: "centre" }])
      // Flatten: iOS composites a home-screen icon onto black, and some older
      // versions mishandle RGBA PNGs, so ship a plain opaque tile.
      .flatten({ background: "#380109" })
      .removeAlpha()
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`${path.relative(ROOT, out)} ${size}x${size}`);
  };

  await tile(256, path.join(ROOT, "app", "icon.png"));
  // iOS home screen.
  await tile(180, path.join(ROOT, "app", "apple-icon.png"));
  // Web app manifest (Android / desktop install). The maskable one keeps the
  // mark well inside the safe zone so a circular mask cannot clip it.
  await tile(192, path.join(PUBLIC, "icon-192.png"));
  await tile(512, path.join(PUBLIC, "icon-512.png"));
  await tile(512, path.join(PUBLIC, "icon-maskable-512.png"), 0.46);
})();
