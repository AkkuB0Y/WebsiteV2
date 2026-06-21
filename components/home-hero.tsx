"use client";

import { motion } from "framer-motion";

import { ShimmerText } from "@/components/shimmer-text";
import { site } from "@/content/site";

export function HomeHero() {
  return (
    <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="text-xl leading-relaxed text-text md:text-2xl"
      >
        {site.intro.map((segment, index) =>
          segment.shimmer ? (
            <ShimmerText key={index}>{segment.text}</ShimmerText>
          ) : (
            <span key={index}>{segment.text}</span>
          )
        )}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.75 }}
        className="max-w-xl text-sm leading-relaxed text-muted md:text-base"
      >
        {site.description}
      </motion.p>
    </div>
  );
}
