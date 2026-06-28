import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import convert from "heic-convert";

const IMAGE_DIRS = ["public/images/gallery", "public/images/places"];

const HEIC_PATTERN = /\.heic$/i;

async function shouldConvert(heicPath, jpgPath) {
  try {
    const [heicStat, jpgStat] = await Promise.all([
      stat(heicPath),
      stat(jpgPath),
    ]);

    return heicStat.mtimeMs > jpgStat.mtimeMs;
  } catch {
    return true;
  }
}

async function convertHeicFile(inputPath, outputPath) {
  const inputBuffer = await readFile(inputPath);
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 0.9,
  });

  await writeFile(outputPath, Buffer.from(outputBuffer));
  console.log(`Converted ${inputPath} -> ${outputPath}`);
}

async function convertDirectory(directory) {
  const absoluteDir = join(process.cwd(), directory);
  const entries = await readdir(absoluteDir);

  await Promise.all(
    entries
      .filter((entry) => HEIC_PATTERN.test(entry))
      .map(async (entry) => {
        const inputPath = join(absoluteDir, entry);
        const outputPath = join(
          absoluteDir,
          entry.replace(HEIC_PATTERN, ".jpg")
        );

        if (!(await shouldConvert(inputPath, outputPath))) {
          return;
        }

        await convertHeicFile(inputPath, outputPath);
      })
  );
}

async function main() {
  for (const directory of IMAGE_DIRS) {
    await convertDirectory(directory);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
