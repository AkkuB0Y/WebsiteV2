const HEIC_PATTERN = /\.heic$/i;
const UPPERCASE_EXT_PATTERN = /\.(jpe?g|png|webp|gif)$/i;

/** Normalize paths for Linux deploys (case-sensitive) and HEIC twins. */
export function resolveFunImageSrc(src: string): string {
  let resolved = src;

  if (HEIC_PATTERN.test(resolved)) {
    resolved = resolved.replace(HEIC_PATTERN, ".jpg");
  }

  return resolved.replace(UPPERCASE_EXT_PATTERN, (ext) => ext.toLowerCase());
}

export function isHeicSrc(src: string): boolean {
  return HEIC_PATTERN.test(src);
}
