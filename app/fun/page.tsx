import { FunSubsectionTitle } from "@/components/fun/fun-subsection-title";
import { ParallaxGallery } from "@/components/fun/parallax-gallery";
import { PlacesMapLoader } from "@/components/fun/places-map-loader";
import { YoutubeGrid } from "@/components/fun/youtube-grid";
import { Section } from "@/components/section";
import { fun } from "@/content/fun";

export default function FunPage() {
  return (
    <Section title="Fun">
      <div className="flex flex-col gap-16">
        <section>
          <FunSubsectionTitle>Guitar</FunSubsectionTitle>
          <YoutubeGrid videos={fun.videos} />
        </section>

        <section>
          <FunSubsectionTitle>Gallery</FunSubsectionTitle>
          <ParallaxGallery photos={fun.galleryPhotos} />
        </section>

        <section>
          <FunSubsectionTitle>Places</FunSubsectionTitle>
          <PlacesMapLoader places={fun.places} />
        </section>
      </div>
    </Section>
  );
}
