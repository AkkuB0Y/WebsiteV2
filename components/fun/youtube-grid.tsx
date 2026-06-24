import Image from "next/image";
import { Play } from "lucide-react";

import type { FunVideo } from "@/content/fun";
import { cardClassName } from "@/lib/card-styles";
import { cn } from "@/lib/utils";

type YoutubeGridProps = {
  videos: FunVideo[];
};

function youtubeThumbnailUrl(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

function youtubeWatchUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function YoutubeGrid({ videos }: YoutubeGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <a
          key={video.id}
          href={youtubeWatchUrl(video.youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${video.title} on YouTube`}
          className={cn(cardClassName, "block overflow-hidden")}
        >
          <div className="relative aspect-video overflow-hidden bg-surface-2">
            <Image
              src={youtubeThumbnailUrl(video.youtubeId)}
              alt=""
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-text backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium leading-snug text-text">
              {video.title}
            </h3>
          </div>
        </a>
      ))}
    </div>
  );
}
