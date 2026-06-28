import { mkdir, readdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import sharp from "sharp";

/**
 * Downscales + compresses oversized photos in place so the site ships
 * web-appropriate images instead of multi-megapixel originals.
 *
 * - Originals are backed up once to ./image-originals (gitignored) before the
 *   first time a file is rewritten, so nothing is ever lost.
 * - Idempotent: a file is skipped once it is already within MAX_WIDTH and
 *   under SKIP_SIZE_BYTES, so repeated dev/build runs never re-compress and
 *   degrade quality.
 */

const IMAGE_DIRS = [
  "public/images/gallery",
  "public/images/places",
  "public/images/experience",
];

const BACKUP_ROOT = "image-originals";
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 80;
const SKIP_SIZE_BYTES = 600 * 1024; // 600 KB
const RASTER_PATTERN = /\.(jpe?g|png)$/i;

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

async function optimizeFile(absolutePath) {
  // A backup means this file was already optimized on a previous run; never
  // re-encode it, otherwise repeated runs would compound JPEG quality loss.
  if (existsSync(backupPathFor(absolutePath))) {
    return false;
  }

  const { size } = await stat(absolutePath);
  const image = sharp(absolutePath, { failOn: "none" });
  const metadata = await image.metadata();

  const withinWidth = !metadata.width || metadata.width <= MAX_WIDTH;
  if (withinWidth && size <= SKIP_SIZE_BYTES) {
    return false;
  }

  await backupOnce(absolutePath);

  const isPng = /\.png$/i.test(absolutePath);
  const pipeline = image
    .rotate() // respect EXIF orientation before stripping metadata
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });

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

async function optimizeDirectory(directory) {
  const absoluteDir = join(process.cwd(), directory);
  if (!existsSync(absoluteDir)) {
    return;
  }

  const entries = await readdir(absoluteDir);

  await Promise.all(
    entries
      .filter((entry) => RASTER_PATTERN.test(entry))
      .map((entry) => optimizeFile(join(absoluteDir, entry)))
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
