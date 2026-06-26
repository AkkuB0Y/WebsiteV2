"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { FunImage } from "@/components/fun/fun-image";
import type { GalleryPhoto } from "@/content/fun";
import { cn } from "@/lib/utils";

type ParallaxGalleryProps = {
  photos: GalleryPhoto[];
};

const BRICK_WIDTHS = ["w-[42%]", "w-[28%]", "w-[34%]", "w-[38%]"] as const;
const BRICK_ASPECTS = [
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[5/4]",
] as const;

function repeatPhotos(photos: GalleryPhoto[], times: number) {
  return Array.from({ length: times }, (_, repeatIndex) =>
    photos.map((photo) => ({
      ...photo,
      id: `${photo.id}-${repeatIndex}`,
    }))
  ).flat();
}

type GalleryTileProps = {
  photo: GalleryPhoto;
  index: number;
};

function GalleryTile({ photo, index }: GalleryTileProps) {
  return (
    <div
      className={cn(
        "shrink-0 overflow-hidden rounded-md border border-border bg-surface-2",
        BRICK_WIDTHS[index % BRICK_WIDTHS.length],
        BRICK_ASPECTS[index % BRICK_ASPECTS.length]
      )}
    >
      <div className="relative h-full w-full">
        <FunImage
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function ParallaxGallery({ photos }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backLayerY = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);
  const frontLayerY = useTransform(scrollYProgress, [0, 1], ["14%", "-32%"]);
  const backLayerX = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const frontLayerX = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  const backPhotos = useMemo(() => repeatPhotos(photos, 4), [photos]);
  const frontPhotos = useMemo(
    () => repeatPhotos([...photos].reverse(), 4),
    [photos]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[70vh] min-h-[420px] max-h-[640px] overflow-hidden rounded-md border border-border bg-surface"
    >
      <motion.div
        style={{ y: backLayerY, x: backLayerX }}
        className="absolute inset-x-0 top-0 flex flex-wrap justify-center gap-3 px-6 pt-6"
        aria-hidden
      >
        {backPhotos.map((photo, index) => (
          <GalleryTile key={photo.id} photo={photo} index={index} />
        ))}
      </motion.div>

      <motion.div
        style={{ y: frontLayerY, x: frontLayerX }}
        className="absolute inset-x-0 top-16 flex flex-wrap justify-center gap-3 px-6"
      >
        {frontPhotos.map((photo, index) => (
          <GalleryTile key={photo.id} photo={photo} index={index + 1} />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
    </div>
  );
}
