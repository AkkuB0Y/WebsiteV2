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
