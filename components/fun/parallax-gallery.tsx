"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { FunImage } from "@/components/fun/fun-image";
import type { GalleryPhoto } from "@/content/fun";
import { cn } from "@/lib/utils";

type ParallaxGalleryProps = {
  photos: GalleryPhoto[];
};

const TILE_CLASS =
  "relative aspect-[4/3] shrink-0 overflow-hidden rounded-md border border-border bg-surface-2 w-[calc((var(--gallery-viewport,100%)-0.75rem)/2)] sm:w-72";

const ROW_OFFSET_CLASS =
  "pl-[calc((var(--gallery-viewport,100%)-0.75rem)/4+0.375rem)] sm:pl-[calc(9rem+0.5rem)]";

function splitIntoTwoRows(photos: GalleryPhoto[]) {
  const midpoint = Math.ceil(photos.length / 2);

  return [photos.slice(0, midpoint), photos.slice(midpoint)] as const;
}

type GalleryTileProps = {
  photo: GalleryPhoto;
  scrollYProgress: MotionValue<number>;
  drift: number;
  enableMotion: boolean;
};

function GalleryTile({
  photo,
  scrollYProgress,
  drift,
  enableMotion,
}: GalleryTileProps) {
  const imageX = useTransform(
    scrollYProgress,
    [0, 1],
    [`${drift * 5}%`, `${drift * -5}%`]
  );

  return (
    <div className={TILE_CLASS}>
      {enableMotion ? (
        <motion.div
          style={{ x: imageX }}
          className="absolute inset-0 scale-[1.12]"
        >
          <FunImage
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, 288px"
          />
        </motion.div>
      ) : (
        <FunImage
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 45vw, 288px"
        />
      )}
    </div>
  );
}

type GalleryRowProps = {
  row: GalleryPhoto[];
  rowIndex: number;
  scrollYProgress: MotionValue<number>;
  enableMotion: boolean;
  offset?: boolean;
};

function GalleryRow({
  row,
  rowIndex,
  scrollYProgress,
  enableMotion,
  offset = false,
}: GalleryRowProps) {
  const direction = rowIndex % 2 === 0 ? -1 : 1;
  const rowX = useTransform(
    scrollYProgress,
    [0, 1],
    [`${direction * 6}%`, `${direction * -6}%`]
  );

  const content = (
    <div
      className={cn(
        "flex min-w-full gap-3 sm:gap-4",
        offset && ROW_OFFSET_CLASS
      )}
    >
      {row.map((photo, photoIndex) => (
        <GalleryTile
          key={photo.id}
          photo={photo}
          scrollYProgress={scrollYProgress}
          drift={direction * (photoIndex + 1) * -0.35}
          enableMotion={enableMotion}
        />
      ))}
    </div>
  );

  if (!enableMotion) {
    return <div className="w-max min-w-full">{content}</div>;
  }

  return (
    <motion.div style={{ x: rowX }} className="w-max min-w-full">
      {content}
    </motion.div>
  );
}

export function ParallaxGallery({ photos }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;

  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [rowOne, rowTwo] = useMemo(
    () => splitIntoTwoRows(photos),
    [photos]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    const syncViewportWidth = () => {
      element.style.setProperty(
        "--gallery-viewport",
        `${element.clientWidth}px`
      );
    };

    syncViewportWidth();

    const resizeObserver = new ResizeObserver(syncViewportWidth);
    resizeObserver.observe(element);
    window.addEventListener("resize", syncViewportWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncViewportWidth);
    };
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || !isHovered) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 640px)").matches) {
        return;
      }

      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [isHovered]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    const updateScrollHints = () => {
      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      setCanScrollLeft(element.scrollLeft > 4);
      setCanScrollRight(element.scrollLeft < maxScrollLeft - 4);
    };

    updateScrollHints();
    element.addEventListener("scroll", updateScrollHints, { passive: true });
    window.addEventListener("resize", updateScrollHints);

    return () => {
      element.removeEventListener("scroll", updateScrollHints);
      window.removeEventListener("resize", updateScrollHints);
    };
  }, [photos]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max min-w-full flex-col gap-3 sm:gap-4">
          <GalleryRow
            row={rowOne}
            rowIndex={0}
            scrollYProgress={scrollYProgress}
            enableMotion={enableMotion}
          />
          <GalleryRow
            row={rowTwo}
            rowIndex={1}
            scrollYProgress={scrollYProgress}
            enableMotion={enableMotion}
            offset
          />
        </div>
      </div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 hidden w-10 bg-gradient-to-r from-bg to-transparent transition-opacity duration-300 sm:block",
          canScrollLeft ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 hidden w-10 bg-gradient-to-l from-bg to-transparent transition-opacity duration-300 sm:block",
          canScrollRight ? "opacity-100" : "opacity-0"
        )}
      />

      <p className="mt-3 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted/50 sm:block">
        {isHovered ? "Scroll sideways" : "Hover to scroll"}
      </p>
    </div>
  );
}
