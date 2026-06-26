/**
 * Fun page content — edit this file to update /fun.
 *
 * Images go in public/:
 *   - Gallery:  public/images/gallery/  (.HEIC supported — auto-converted to .jpg on build)
 *   - Places:   public/images/places/
 *
 * YouTube ID = the `v=` param from a watch URL
 *   e.g. youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
 *
 * Section headings ("Guitar", etc.) live in app/fun/page.tsx
 */

export type FunVideo = {
  id: string;
  youtubeId: string;
  title: string;
};

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
};

export type Place = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  thumbnail: string;
  description: string;
};

export type FunContent = {
  videos: FunVideo[];
  galleryPhotos: GalleryPhoto[];
  places: Place[];
};

export const fun: FunContent = {
  videos: [
    {
      id: "video-1",
      youtubeId: "lmz-8i-tpwM",
      title: "Club Penguin - Ice Fishing (Cover)",
    },
    {
      id: "video-2",
      youtubeId: "m4Q8zKtOm9o",
      title: "Metallica - Wherever I May Roam (Solo Cover)",
    },
    {
      id: "video-3",
      youtubeId: "m5w_zMPqDic",
      title: "Guns N' Roses - Knockin' on Heaven's Door (Solo Cover)",
    },
  ],
  galleryPhotos: [
    {
      id: "photo-1",
      src: "/images/gallery/IMG_1127.HEIC",
      alt: "Out and about with friends",
    },
    {
      id: "photo-2",
      src: "/images/gallery/IMG_1591.HEIC",
      alt: "A night out in the city",
    },
    {
      id: "photo-3",
      src: "/images/gallery/IMG_1609.HEIC",
      alt: "Travel snapshot from the road",
    },
    {
      id: "photo-4",
      src: "/images/gallery/IMG_1636.HEIC",
      alt: "Candid moment from a trip",
    },
  ],
  places: [
    {
      id: "place-toronto",
      name: "Toronto",
      lat: 43.6532,
      lng: -79.3832,
      thumbnail: "/images/places/toronto.HEIC",
      description:
        "Home base — concerts, late-night food runs, and exploring the city between terms.",
    },
    {
      id: "place-vancouver",
      name: "Vancouver",
      lat: 49.2827,
      lng: -123.1207,
      thumbnail: "/images/places/vancouver.HEIC",
      description:
        "Mountains and ocean in the same skyline — one of the most scenic cities I've visited.",
    },
    {
      id: "place-montreal",
      name: "Montreal",
      lat: 45.5017,
      lng: -73.5673,
      thumbnail: "/images/places/montreal.HEIC",
      description:
        "French-Canadian culture, incredible food, and long walks through Old Montreal.",
    },
    {
      id: "place-quebec-city",
      name: "Quebec City",
      lat: 46.8139,
      lng: -71.208,
      thumbnail: "/images/places/quebeccity.HEIC",
      description:
        "Cobblestone streets and European charm without leaving North America.",
    },
    {
      id: "place-ottawa",
      name: "Ottawa",
      lat: 45.4215,
      lng: -75.6972,
      thumbnail: "/images/places/ottawa.HEIC",
      description:
        "Canada's capital — museums, the canal, and a quieter pace than Toronto.",
    },
    {
      id: "place-nyc",
      name: "New York City",
      lat: 40.7128,
      lng: -74.006,
      thumbnail: "/images/places/nyc.HEIC",
      description:
        "The city that needs no introduction — energy, pizza, and endless things to see.",
    },
    {
      id: "place-las-vegas",
      name: "Las Vegas",
      lat: 36.1699,
      lng: -115.1398,
      thumbnail: "/images/places/lasvegas.jpg",
      description:
        "Neon lights, shows, and the desert absurdity of the Strip.",
    },
    {
      id: "place-grand-canyon",
      name: "Grand Canyon",
      lat: 36.0544,
      lng: -112.1401,
      thumbnail: "/images/places/grandcanyon.jpg",
      description:
        "Standing at the edge of something that genuinely doesn't look real.",
    },
    {
      id: "place-florida",
      name: "Florida",
      lat: 25.7617,
      lng: -80.1918,
      thumbnail: "/images/places/florida.HEIC",
      description:
        "Sun, beaches, and a warm escape from Canadian winters.",
    },
    {
      id: "place-mumbai",
      name: "Mumbai",
      lat: 19.076,
      lng: 72.8777,
      thumbnail: "/images/places/mumbai.HEIC",
      description:
        "India's financial capital — chaotic, vibrant, and impossible to forget.",
    },
    {
      id: "place-kancheepuram",
      name: "Kanchipuram",
      lat: 12.8342,
      lng: 79.7036,
      thumbnail: "/images/places/kancheepuram.HEIC",
      description:
        "Temple town in Tamil Nadu — silk sarees and centuries of history.",
    },
  ],
};
