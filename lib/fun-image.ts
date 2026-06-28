const HEIC_PATTERN = /\.heic$/i;

/** HEIC isn't reliably rendered in browsers — serve the converted JPEG twin. */
export function resolveFunImageSrc(src: string): string {
  if (HEIC_PATTERN.test(src)) {
    return src.replace(HEIC_PATTERN, ".jpg");
  }

  return src;
}

export function isHeicSrc(src: string): boolean {
  return HEIC_PATTERN.test(src);
}
