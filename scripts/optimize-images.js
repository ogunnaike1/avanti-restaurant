/*
 * Re-encodes everything in public/ down to the largest size its slot can actually
 * use (CSS size x 2 for retina), so next/image has less to chew on and the first
 * uncached request is cheap. Run after adding artwork:
 *
 *   node scripts/optimize-images.js          # rewrite in place
 *   node scripts/optimize-images.js --dry    # report only
 *
 * Re-encoding a JPEG repeatedly loses a little quality each time, so run it on
 * freshly added files rather than over and over on the same ones.
 */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const dryRun = process.argv.includes("--dry");

/** First matching rule wins. `width` is the longest-edge cap. */
const rules = [
  // Full-bleed backdrops: 100vw, but nothing gains past 1920.
  { test: /^images[\\/](hero-|experience-)/, width: 1920, quality: 68 },
  // Menu strip and the burrata/sea bass portraits: a third of a wide viewport.
  { test: /^images[\\/]menu-/, width: 1000, quality: 72 },
  // Signature dish cards: a quarter of the grid.
  { test: /^images[\\/]dish-/, width: 900, quality: 72 },
  // Menu row thumbnails render at 92px.
  { test: /^images[\\/]item-/, width: 400, quality: 70 },
  // Half-width editorial images and portraits.
  { test: /^images[\\/]/, width: 1400, quality: 72 },
  // The mark: largest use is the hero at ~430px CSS.
  { test: /^avanti-.*\.png$/, width: 900, png: true },
];

const files = [
  ...fs.readdirSync(path.join(ROOT, "public")).map((f) => f),
  ...fs.readdirSync(path.join(ROOT, "public", "images")).map((f) => path.join("images", f)),
].filter((f) => /\.(jpe?g|png)$/i.test(f));

(async () => {
  let before = 0;
  let after = 0;
  const changes = [];

  for (const relative of files) {
    const rule = rules.find((r) => r.test.test(relative));
    if (!rule) continue;

    const file = path.join(ROOT, "public", relative);
    // Read into memory first: on Windows, leaving the source open makes the
    // rewrite fail with UNKNOWN while a dev server is holding the same file.
    const source = fs.readFileSync(file);
    const startSize = source.length;
    const meta = await sharp(source).metadata();
    const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

    let pipeline = sharp(source).rotate();
    if (longest > rule.width) {
      pipeline = pipeline.resize(
        meta.width >= meta.height ? { width: rule.width } : { height: rule.width },
      );
    }

    const buffer = rule.png
      ? await pipeline.png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toBuffer()
      : await pipeline
          .jpeg({ quality: rule.quality, mozjpeg: true, progressive: true, chromaSubsampling: "4:2:0" })
          .toBuffer();

    before += startSize;

    // Never write a file that came out heavier than the one we already had.
    if (buffer.length >= startSize) {
      after += startSize;
      continue;
    }

    after += buffer.length;
    changes.push({
      relative,
      from: startSize,
      to: buffer.length,
      resized: longest > rule.width ? `${longest}px → ${rule.width}px` : "",
    });

    if (!dryRun) fs.writeFileSync(file, buffer);
  }

  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  for (const change of changes) {
    const saved = Math.round((1 - change.to / change.from) * 100);
    console.log(
      `${change.relative.padEnd(34)} ${kb(change.from).padStart(8)} → ${kb(change.to).padStart(8)}  -${saved}%  ${change.resized}`,
    );
  }
  console.log(
    `\n${dryRun ? "[dry run] " : ""}${changes.length} files · ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB (-${Math.round((1 - after / before) * 100)}%)`,
  );
})();
