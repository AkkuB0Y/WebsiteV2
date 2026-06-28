/**
 * Fun page content — edit this file to update /fun.
 *
 * Images go in public/:
 *   - Gallery:  public/images/gallery/  (.JPG supported — auto-converted to .jpg on build)
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
      src: "/images/gallery/IMG_1127.JPG",
      alt: "vancouver",
    },
    {
      id: "photo-2",
      src: "/images/gallery/IMG_1591.JPG",
      alt: "vancouver",
    },
    {
      id: "photo-3",
      src: "/images/gallery/IMG_1609.JPG",
      alt: "vancouver",
    },
    {
      id: "photo-4",
      src: "/images/gallery/IMG_1636.JPG",
      alt: "vancouver",
    },
    {
      id: "photo-5",
      src: "/images/gallery/IMG_1150.JPG",
      alt: "vancouver",
    },
    {
      id: "photo-6",
      src: "/images/gallery/IMG_1172.JPG",
      alt: "vancouver",
    },
    {
      id: "photo-7",
      src: "/images/gallery/IMG_1215.JPG",
      alt: "vancouver",
    },
    {
      id: "photo-8",
      src: "/images/gallery/IMG_1217.JPG",
      alt: "vancouver",
    },
    {
      id: "photo-9",
      src: "/images/gallery/IMG_1570.JPG",
      alt: "vancouver",
    },
  ],
  places: [
    {
      id: "place-toronto",
      name: "Toronto",
      lat: 43.6532,
      lng: -79.3832,
      thumbnail: "/images/places/toronto.JPG",
      description:
        "Home town!",
    },
    {
      id: "place-vancouver",
      name: "Vancouver",
      lat: 49.2827,
      lng: -123.1207,
      thumbnail: "/images/places/vancouver.JPG",
      description:
        "Never seen snow-capped peaks and palm trees on a beach in one view except for here. Currently here for my 4th co-op.",
    },
    {
      id: "place-montreal",
      name: "Montreal",
      lat: 45.5017,
      lng: -73.5673,
      thumbnail: "/images/places/montreal.JPG",
      description:
        "Everything to love about Europe and North America in one city. Visited a million times",
    },
    {
      id: "place-quebec-city",
      name: "Quebec City",
      lat: 46.8139,
      lng: -71.208,
      thumbnail: "/images/places/quebeccity.JPG",
      description:
        "North America's most European city. Visited 2025",
    },
    {
      id: "place-ottawa",
      name: "Ottawa",
      lat: 45.4215,
      lng: -75.6972,
      thumbnail: "/images/places/ottawa.JPG",
      description:
        "Canada's boring but peaceful capital. Lived here for my 3rd co-op",
    },
    {
      id: "place-nyc",
      name: "New York City",
      lat: 40.7128,
      lng: -74.006,
      thumbnail: "/images/places/nyc.JPG",
      description:
        "The big apple! Visited 2025",
    },
    {
      id: "place-las-vegas",
      name: "Las Vegas",
      lat: 36.1699,
      lng: -115.1398,
      thumbnail: "/images/places/lasvegas.jpg",
      description:
        "Does this place need an introduction? Visited 2018",
    },
    {
      id: "place-grand-canyon",
      name: "Grand Canyon",
      lat: 36.0544,
      lng: -112.1401,
      thumbnail: "/images/places/grandcanyon.jpg",
      description:
        "Big hole in the ground. Visited 2018",
    },
    {
      id: "place-florida",
      name: "St. Augustine",
      lat: 29.8892,
      lng: -81.3043,
      thumbnail: "/images/places/florida.JPG",
      description:
        "Oldest city in the US and beautiful Florida weather. Visited 2024",
    },
    {
      id: "place-mumbai",
      name: "Mumbai",
      lat: 19.076,
      lng: 72.8777,
      thumbnail: "/images/places/mumbai.JPG",
      description:
        "India's NYC and LA. Born here 2005",
    },
    {
      id: "place-kancheepuram",
      name: "Tamil Nadu",
      lat: 12.8342,
      lng: 79.7036,
      thumbnail: "/images/places/kancheepuram.JPG",
      description:
        "Cool picture from above showing the green fields during the North-East monsoon. Visited 2023",
    },
  ],
};
