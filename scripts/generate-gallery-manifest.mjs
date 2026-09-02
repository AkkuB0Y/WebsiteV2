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
