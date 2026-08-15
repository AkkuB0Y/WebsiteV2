# Plan: auto-discovered gallery, random order per reload, tighter compression

Implementation plan for the `/fun` gallery. Written to be followed step by step, in
order. Every file's full new contents or exact edit is given below. Do not improvise
beyond these steps.

## Goal

1. **Filenames stop mattering.** Any image dropped into `public/images/gallery/` shows
   up on `/fun` automatically. No editing TypeScript to add a photo.
2. **The gallery shuffles on every page reload.**
3. **One command compresses everything** after a batch of photos is added, sized per
   folder rather than one global 1600px setting.

Target scale is 50-70 gallery photos kept **in the repo** (no Cloudflare/S3). At that
count, correctly sized images total roughly 4-6 MB, which is fine for git and for the
Vercel static deploy.

## Background you need before editing

- This is a **Next.js 15 static export** (`output: "export"`, `images.unoptimized: true`
  in `next.config.mjs`). There is no server at runtime, so **everything in `public/`
  ships to the browser byte for byte** and nothing can be resized on demand. Do not
  change either of those config values.
- `npm run dev` and `npm run build` both run `npm run prepare-images` first.
- `scripts/optimize-images.mjs` rewrites images **in place** and keeps a one-time
  backup of each original in `image-originals/` (gitignored). The presence of a backup
  is what makes the script idempotent: a file that already has a backup is skipped so
  repeated runs never re-compress and degrade quality. **Preserve that property.**
- Vercel builds on Linux, which has a **case-sensitive** filesystem. A `src` of
  `/images/gallery/Foo.JPG` will 404 if the file on disk is `foo.jpg`. This is why the
  generated manifest must use the exact on-disk filename, and why the gallery must not
  run its paths through `resolveFunImageSrc` (see Step 4).

## Files touched

| File | Action |
| --- | --- |
| `scripts/optimize-images.mjs` | Rewrite (per-folder sizes, `--force` flag) |
| `scripts/generate-gallery-manifest.mjs` | Create |
| `content/gallery-manifest.json` | Generated, then committed |
| `content/gallery.ts` | Create |
| `content/fun.ts` | Edit (remove gallery photos + type) |
| `app/fun/page.tsx` | Edit (import gallery from new module) |
| `components/fun/parallax-gallery.tsx` | Edit (shuffle, new import, plain `Image`) |
| `lib/shuffle.ts` | Create |
| `package.json` | Edit (scripts) |
| `AGENTS.md` | Edit (document new workflow) |

Do **not** touch `components/fun/fun-image.tsx`, `lib/fun-image.ts`,
`components/fun/places-map.tsx`, or `content/experience.ts`. The places map keeps using
`FunImage` because `content/fun.ts` still hand-writes `.JPG` paths for those.

---

## Step 1 — Rewrite `scripts/optimize-images.mjs`

Two changes: per-folder max widths (the gallery renders at ~288 px, the map popups at
~208 px, so 1600 px everywhere is wasteful), and a `--force` flag used once in Step 7 to
re-compress images that were already optimized at the old size.

Replace the **entire file** with:

```js
import { mkdir, readdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import sharp from "sharp";

/**
 * Downscales + compresses photos in place so the static export ships
 * web-appropriate images instead of multi-megapixel originals.
 *
 * - Originals are backed up once to ./image-originals (gitignored) before the
 *   first time a file is rewritten, so nothing is ever lost.
 * - Idempotent: a file that already has a backup is skipped, so repeated
 *   dev/build runs never re-compress and degrade quality.
 * - Pass --force to restore each original from its backup and re-encode it.
 *   Use that only when the target sizes below change.
 */

const IMAGE_DIRS = [
  // Gallery tiles render at ~288px wide; 600px covers 2x displays.
  { path: "public/images/gallery", maxWidth: 600, skipSizeBytes: 150 * 1024 },
  // Map popup thumbnails render at ~208px wide.
  { path: "public/images/places", maxWidth: 400, skipSizeBytes: 100 * 1024 },
  // Company logos render small.
  { path: "public/images/experience", maxWidth: 256, skipSizeBytes: 80 * 1024 },
];

const BACKUP_ROOT = "image-originals";
const JPEG_QUALITY = 80;
const RASTER_PATTERN = /\.(jpe?g|png)$/i;
const FORCE = process.argv.includes("--force");

function backupPathFor(absolutePath) {
  return join(
    process.cwd(),
    BACKUP_ROOT,
    relative(join(process.cwd(), "public/images"), absolutePath)
  );
}

async function backupOnce(absolutePath) {
  const backupPath = backupPathFor(absolutePath);
  await mkdir(join(backupPath, ".."), { recursive: true });
  await copyFile(absolutePath, backupPath);
}

async function optimizeFile(absolutePath, { maxWidth, skipSizeBytes }) {
  const backupPath = backupPathFor(absolutePath);
  const hasBackup = existsSync(backupPath);

  // A backup means this file was already optimized on a previous run; never
  // re-encode it, otherwise repeated runs would compound JPEG quality loss.
  if (hasBackup && !FORCE) {
    return false;
  }

  // --force re-encodes from the pristine original rather than from the
  // already-compressed file, so quality does not stack up losses.
  if (hasBackup) {
    await copyFile(backupPath, absolutePath);
  }

  const { size } = await stat(absolutePath);
  const image = sharp(absolutePath, { failOn: "none" });
  const metadata = await image.metadata();

  const withinWidth = !metadata.width || metadata.width <= maxWidth;
  if (withinWidth && size <= skipSizeBytes) {
    return false;
  }

  if (!hasBackup) {
    await backupOnce(absolutePath);
  }

  const isPng = /\.png$/i.test(absolutePath);
  const pipeline = image
    .rotate() // respect EXIF orientation before stripping metadata
    .resize({ width: maxWidth, withoutEnlargement: true });

  const buffer = await (isPng
    ? pipeline.png({ compressionLevel: 9, palette: true })
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  ).toBuffer();

  // Only write if we actually made it smaller.
  if (buffer.length >= size) {
    return false;
  }

  await sharp(buffer).toFile(absolutePath);
  console.log(
    `Optimized ${relative(process.cwd(), absolutePath)} ` +
      `(${(size / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB)`
  );
  return true;
}

async function optimizeDirectory({ path, maxWidth, skipSizeBytes }) {
  const absoluteDir = join(process.cwd(), path);
  if (!existsSync(absoluteDir)) {
    return;
  }

  const entries = await readdir(absoluteDir);

  await Promise.all(
    entries
      .filter((entry) => RASTER_PATTERN.test(entry))
      .map((entry) =>
        optimizeFile(join(absoluteDir, entry), { maxWidth, skipSizeBytes })
      )
  );
}

async function main() {
  for (const directory of IMAGE_DIRS) {
    await optimizeDirectory(directory);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

---

## Step 2 — Create `scripts/generate-gallery-manifest.mjs`

This is what makes filenames irrelevant: it lists the folder and writes a JSON manifest
the app imports.

```js
import { readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, extname, join } from "node:path";

/**
 * Scans public/images/gallery and writes content/gallery-manifest.json so the
 * gallery picks up new photos without anyone editing TypeScript.
 *
 * Runs after convert-heic and optimize-images (see the prepare-images script),
 * so by this point every gallery file is a web-ready raster.
 *
 * The emitted `src` is the exact on-disk filename: Vercel builds on a
 * case-sensitive filesystem, so rewriting the case here would cause 404s.
 */

const GALLERY_DIR = "public/images/gallery";
const MANIFEST_PATH = "content/gallery-manifest.json";
const IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;
const CAMERA_NAME_PATTERN = /^(img|dsc|dscf|pxl|photo|image|screenshot)[-_ ]?\d+/i;

function toId(filename, usedIds) {
  const base = basename(filename, extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const id = base || "photo";
  if (!usedIds.has(id)) {
    usedIds.add(id);
    return id;
  }

  let suffix = 2;
  while (usedIds.has(`${id}-${suffix}`)) {
    suffix += 1;
  }

  const uniqueId = `${id}-${suffix}`;
  usedIds.add(uniqueId);
  return uniqueId;
}

function toAlt(filename) {
  const stem = basename(filename, extname(filename));

  // Camera filenames (IMG_1234) carry no meaning; anything else probably does.
  if (CAMERA_NAME_PATTERN.test(stem)) {
    return "Gallery photo";
  }

  const words = stem.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!words) {
    return "Gallery photo";
  }

  return words.charAt(0).toUpperCase() + words.slice(1);
}

async function main() {
  const absoluteDir = join(process.cwd(), GALLERY_DIR);
  const entries = existsSync(absoluteDir) ? await readdir(absoluteDir) : [];
  const usedIds = new Set();

  const photos = entries
    .filter((entry) => IMAGE_PATTERN.test(entry))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((filename) => ({
      id: toId(filename, usedIds),
      src: `/images/gallery/${filename}`,
      alt: toAlt(filename),
    }));

  await writeFile(
    join(process.cwd(), MANIFEST_PATH),
    `${JSON.stringify(photos, null, 2)}\n`
  );

  console.log(`Gallery manifest: ${photos.length} photo(s) -> ${MANIFEST_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

Notes:

- The sort keeps the manifest stable so a rebuild that adds nothing produces no diff.
  Display order is randomized in the browser (Step 5), not here.
- `.heic` files are ignored on purpose: `scripts/convert-heic-images.mjs` already writes
  a `.jpg` twin for each one, and that twin is what gets listed.

---

## Step 3 — Wire the script into `package.json`

Edit the `scripts` block so it reads exactly:

```json
  "scripts": {
    "dev": "npm run prepare-images && next dev --turbopack",
    "build": "npm run prepare-images && next build",
    "prepare-images": "npm run convert-heic && npm run optimize-images && npm run gallery-manifest",
    "convert-heic": "node scripts/convert-heic-images.mjs",
    "optimize-images": "node scripts/optimize-images.mjs",
    "reoptimize-images": "node scripts/optimize-images.mjs --force",
    "gallery-manifest": "node scripts/generate-gallery-manifest.mjs",
    "start": "next start",
    "lint": "next lint"
  },
```

Order matters: HEIC conversion, then compression, then the manifest.

Now generate the manifest for the first time so the next steps compile:

```bash
npm run gallery-manifest
```

`content/gallery-manifest.json` **is committed** — do not add it to `.gitignore`. The
build must not depend on regenerating it.

---

## Step 4 — Create `content/gallery.ts`

`tsconfig.json` already has `resolveJsonModule: true`, so the JSON import works.

```ts
import manifest from "./gallery-manifest.json";

/**
 * Gallery photos are discovered from public/images/gallery at build time by
 * scripts/generate-gallery-manifest.mjs — add a file, do not edit this list.
 */

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
};

export const galleryPhotos: GalleryPhoto[] = manifest;
```

---

## Step 5 — Edit `content/fun.ts`

1. Delete the `GalleryPhoto` type declaration.
2. Delete `galleryPhotos: GalleryPhoto[];` from the `FunContent` type.
3. Delete the whole `galleryPhotos: [ ... ]` array (all nine entries) from the `fun`
   object.
4. Update the doc comment at the top of the file: replace the gallery line with

```
 *   - Gallery:  public/images/gallery/  (any filename — auto-listed at build time)
```

Leave `FunVideo`, `Place`, `videos`, `places`, and the two social URLs untouched.

---

## Step 6 — Edit the gallery components

### 6a. Create `lib/shuffle.ts`

```ts
/** Fisher-Yates shuffle. Returns a new array; the input is not mutated. */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}
```

### 6b. Edit `components/fun/parallax-gallery.tsx`

This file is a client component already (`"use client"` on line 1). Four edits:

**Imports.** Replace the `FunImage` and `GalleryPhoto` imports:

```tsx
import Image from "next/image";

import type { GalleryPhoto } from "@/content/gallery";
import { shuffle } from "@/lib/shuffle";
import { cn } from "@/lib/utils";
```

`FunImage` is dropped here on purpose. It lowercases file extensions, which would break
a genuine `Photo.JPG` on Vercel's case-sensitive filesystem; the manifest already emits
exact paths. `FunImage` stays in use by the places map — do not delete it.

**Both `<FunImage ... />` usages inside `GalleryTile`** become `<Image ... />`. Keep
every existing prop (`src`, `alt`, `fill`, `className`, `sizes`) exactly as is.

**Shuffle on mount.** Inside `ParallaxGallery`, add state seeded with the prop and a
`useEffect` that reshuffles after hydration:

```tsx
const [orderedPhotos, setOrderedPhotos] = useState(photos);

useEffect(() => {
  setOrderedPhotos(shuffle(photos));
}, [photos]);
```

Seeding with `photos` (not a shuffled value) is deliberate: the first client render must
match the prerendered HTML or React logs a hydration mismatch. The reshuffle happens
right after, so each full page reload shows a different order.

**Use the shuffled array.** Change the memo to depend on `orderedPhotos`:

```tsx
const [rowOne, rowTwo] = useMemo(
  () => splitIntoTwoRows(orderedPhotos),
  [orderedPhotos]
);
```

Also change the dependency array of the scroll-hints `useEffect` (the last one in the
file, currently `}, [photos]);`) to `}, [orderedPhotos]);` so the left/right fade hints
recompute after the order changes.

`useState` and `useEffect` are already imported at the top of the file.

### 6c. Edit `app/fun/page.tsx`

Add the import:

```tsx
import { galleryPhotos } from "@/content/gallery";
```

and change the gallery usage from `photos={fun.galleryPhotos}` to `photos={galleryPhotos}`.
Everything else on the page stays.

---

## Step 7 — One-time re-compression of existing images

**Do not skip this, and do not merge it into Step 1.** Every current image already has a
backup in `image-originals/`, so a normal run skips them all and they would stay at the
old 1600px size. Re-encode them from their originals once:

```bash
du -sh public/images        # record the before number
npm run reoptimize-images
du -sh public/images        # record the after number
```

Expect `public/images` to drop from roughly 7.5 MB to roughly 1.5-2.5 MB. Report both
numbers.

Then confirm idempotency — this must print **no** `Optimized ...` lines:

```bash
npm run optimize-images
```

Spot-check two or three images in the browser or an image viewer to confirm they still
look right and are not visibly mushy.

---

## Step 8 — Update `AGENTS.md`

In the "Playbook: Optimize images" section:

- Replace the "Resizes to **max 1600px wide**" bullet with per-folder sizes: gallery
  600px, places 400px, experience 256px, all JPEG quality 80 (mozjpeg).
- Replace the "When adding NEW images" steps for the gallery with: drop files into
  `public/images/gallery/` under any filename, run `npm run prepare-images`, commit both
  the images and the regenerated `content/gallery-manifest.json`. No code edits.
- Add a bullet noting `npm run reoptimize-images` re-encodes from `image-originals/` and
  should only be run when the target sizes in `IMAGE_DIRS` change.
- Add `content/gallery-manifest.json` and `scripts/generate-gallery-manifest.mjs` to the
  "Project basics" script list.

Add a short new section describing the gallery pipeline:
`public/images/gallery/` → `generate-gallery-manifest.mjs` → `content/gallery-manifest.json`
→ `content/gallery.ts` → `ParallaxGallery`, shuffled client-side on each load.

---

## Verification

Run all of these and report results:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Then check by hand:

- `content/gallery-manifest.json` lists every file in `public/images/gallery/`, and each
  `src` matches an on-disk filename exactly, including letter case.
- `out/images/gallery/` in the build output contains those same files.
- `npm run dev`, open `/fun`: all photos render, none are broken, and reloading a few
  times visibly changes the order.
- Browser console on `/fun` shows no hydration warnings.
- The places map popups still show their thumbnails.
- `git status` shows only the intended files changed.

Sanity test that filenames are irrelevant: copy any existing gallery photo to
`public/images/gallery/zzz-test.jpg`, run `npm run prepare-images`, confirm it appears in
the manifest and on the page, then delete it, rerun `npm run prepare-images`, and confirm
the manifest is back to its previous contents.

---

## Out of scope — do not do these

- **Do not** run `git filter-repo`, BFG, or any history rewrite. The repo's `.git` is
  ~57 MB because history holds the old multi-MB originals. Cleaning that is a separate
  task requiring a force-push and the user's explicit go-ahead.
- **Do not** delete or gitignore `image-originals/` — it is the only copy of the
  full-resolution photos and `--force` depends on it.
- **Do not** move images to Cloudflare R2 or any external host. In-repo is the decision
  for this scale; revisit only past ~150 photos or ~20 MB in `public/images`.
- **Do not** add dependencies. `sharp` and `heic-convert` are already available.
- **Do not** convert to WebP in this pass. It is a reasonable follow-up but changes every
  path and is not part of this plan.
- **Do not** auto-discover `places/` or `experience/`. Those images are tied to
  hand-written metadata (coordinates, descriptions, companies) in `content/fun.ts` and
  `content/experience.ts`.
- **Do not** set `images.unoptimized: false` or remove `output: "export"`.
```

