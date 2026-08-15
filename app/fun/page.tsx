import { Instagram, Youtube } from "lucide-react";

import { FunSubsectionTitle } from "@/components/fun/fun-subsection-title";
import { ParallaxGallery } from "@/components/fun/parallax-gallery";
import { PlacesMapLoader } from "@/components/fun/places-map-loader";
import { YoutubeGrid } from "@/components/fun/youtube-grid";
import { Section } from "@/components/section";
import { galleryPhotos } from "@/content/gallery";
import { fun } from "@/content/fun";
import { actionLinkClassName } from "@/lib/card-styles";

export default function FunPage() {
  return (
    <Section title="Fun">
      <div className="relative z-10 mb-10 flex flex-wrap gap-4">
        <a
          href={fun.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={actionLinkClassName}
        >
          <Youtube className="h-4 w-4 shrink-0" />
          YouTube
        </a>
        <a
          href={fun.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={actionLinkClassName}
        >
          <Instagram className="h-4 w-4 shrink-0" />
          Instagram
        </a>
      </div>

      <div className="flex flex-col gap-16">
        <section>
          <FunSubsectionTitle>Guitar</FunSubsectionTitle>
          <YoutubeGrid videos={fun.videos} />
        </section>

        <section>
          <FunSubsectionTitle>Gallery</FunSubsectionTitle>
          <ParallaxGallery photos={galleryPhotos} />
        </section>

        <section>
          <FunSubsectionTitle>Places</FunSubsectionTitle>
          <PlacesMapLoader places={fun.places} />
        </section>
      </div>
    </Section>
  );
}
