"use client";

import dynamic from "next/dynamic";

import type { Place } from "@/content/fun";

const PlacesMap = dynamic(
  () =>
    import("@/components/fun/places-map").then((module) => module.PlacesMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] animate-pulse rounded-md border border-border bg-surface-2" />
    ),
  }
);

type PlacesMapLoaderProps = {
  places: Place[];
};

export function PlacesMapLoader({ places }: PlacesMapLoaderProps) {
  return <PlacesMap places={places} />;
}
