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
      youtubeId: "dQw4w9WgXcQ",
      title: "Lorem Guitar Cover No. 1",
    },
    {
      id: "video-2",
      youtubeId: "dQw4w9WgXcQ",
      title: "Ipsum Acoustic Session",
    },
    {
      id: "video-3",
      youtubeId: "dQw4w9WgXcQ",
      title: "Dolor Solo Practice",
    },
  ],
  galleryPhotos: [
    { id: "photo-1", src: "/images/gallery/placeholder-1.svg", alt: "Lorem ipsum gallery photo 1" },
    { id: "photo-2", src: "/images/gallery/placeholder-2.svg", alt: "Lorem ipsum gallery photo 2" },
    { id: "photo-3", src: "/images/gallery/placeholder-3.svg", alt: "Lorem ipsum gallery photo 3" },
    { id: "photo-4", src: "/images/gallery/placeholder-4.svg", alt: "Lorem ipsum gallery photo 4" },
  ],
  places: [
    {
      id: "place-1",
      name: "Lorem City",
      lat: 40.7128,
      lng: -74.006,
      thumbnail: "/images/places/placeholder-1.svg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "place-2",
      name: "Ipsum Bay",
      lat: 37.7749,
      lng: -122.4194,
      thumbnail: "/images/places/placeholder-2.svg",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
};
