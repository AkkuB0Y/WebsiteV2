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
