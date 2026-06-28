# AGENTS.md

Guidance for AI agents working in this repo. This is a **Next.js 15 static-export**
site (`output: "export"` in `next.config.mjs`), so Next's built-in runtime image
optimization is **disabled** (`images.unoptimized: true`). Images must be optimized
ahead of time instead.

## Project basics

- Framework: Next.js (App Router) + React 19 + Tailwind.
- Build is a static export → the entire `public/` folder is copied as-is.
- Scripts (see `package.json`):
  - `npm run dev` / `npm run build` → run `prepare-images` first, then Next.
  - `npm run prepare-images` → `convert-heic` then `optimize-images`.
  - `npm run optimize-images` → `node scripts/optimize-images.mjs`.

---

## Playbook: Optimize images (most common speed task)

**Problem:** Photos dropped into `public/images/**` are often multi-megapixel
camera originals (e.g. 5712×4284, several MB) but are displayed at <300px. Because
this site is a static export, those full files ship to the browser as-is and make
pages slow.

**Fix:** Run the existing script. It downscales to max width and compresses.

```bash
npm run optimize-images
```

What the script (`scripts/optimize-images.mjs`) does:

- Targets `public/images/gallery`, `public/images/places`, `public/images/experience`.
- Resizes to **max 1600px wide** (never enlarges), re-encodes JPEG at **quality 80**
  (mozjpeg); PNGs are recompressed losslessly.
- **Backs up each original once** to `image-originals/` (gitignored) before rewriting.
- **Idempotent:** if a backup already exists for a file, it is skipped — so repeated
  runs never re-compress and degrade quality. Verify by running twice; the second
  run should print no `Optimized ...` lines.

### When adding NEW images

1. Drop the image into the appropriate `public/images/<dir>/`.
2. Run `npm run optimize-images` (or just `npm run dev` / `npm run build`, which
   call it automatically).
3. Reference it with its normal path (e.g. `/images/gallery/foo.jpg`). No code
   changes needed — paths stay the same; only the file bytes shrink.

### To tune or extend

- Add a new folder → append it to `IMAGE_DIRS` in `scripts/optimize-images.mjs`.
- Change quality/size → edit `MAX_WIDTH` / `JPEG_QUALITY` constants in the same file.

### To restore an original

Copy it back from `image-originals/<same/relative/path>` and delete its backup so
the script will re-process it.

### Rules / do-nots

- **Never** hand-edit or overwrite originals destructively without a backup.
- **Never** turn the script into something that re-encodes already-optimized files
  (it must stay idempotent via the `image-originals/` marker).
- **Do not** set `images.unoptimized: false` or remove `output: "export"` — that
  breaks the static-export deploy.

---

## Playbook: Embedded PDF / iframe goes dark on link click

**Problem:** A PDF embedded via `<iframe src="...pdf">` lets links inside the PDF
navigate the iframe itself. External targets that send `X-Frame-Options: DENY`
(or a `frame-ancestors` CSP) can't render in a frame, so the browser replaces the
PDF with a blank/dark error page.

**Fix (already implemented in `components/resume-viewer.tsx`):** watch the iframe's
`load` events; if it ever navigates away from the intended PDF, immediately restore
the PDF `src`. Use a ref flag so the intentional reload doesn't loop:

- `expectingPdf` starts `true`; the first load (the PDF) flips it to `false` (armed).
- Any later load = an unwanted navigation → reset `iframe.src` and re-arm.

Reuse this pattern for any embedded same-origin document whose internal links could
hijack the frame.

---

## General workflow expectations

- After editing, run `npm run lint` and fix issues you introduced.
- Prefer editing existing files and reusing existing scripts/patterns over adding
  new dependencies (`sharp` and `heic-convert` are already available).
- Keep changes minimal and targeted.
