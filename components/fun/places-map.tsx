"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { FunImage } from "@/components/fun/fun-image";
import type { Place } from "@/content/fun";
import "leaflet/dist/leaflet.css";

type PlacesMapProps = {
  places: Place[];
};

function createMarkerIcon() {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:14px;height:14px;border-radius:9999px;background:#fafafa;border:2px solid #0a0a0a;box-shadow:0 0 12px rgba(250,250,250,0.35);"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });
}

function getMapCenter(places: Place[]): [number, number] {
  if (places.length === 0) {
    return [39.8283, -98.5795];
  }

  const lat =
    places.reduce((sum, place) => sum + place.lat, 0) / places.length;
  const lng =
    places.reduce((sum, place) => sum + place.lng, 0) / places.length;

  return [lat, lng];
}

export function PlacesMap({ places }: PlacesMapProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
      ._getIconUrl;
  }, []);

  const center = getMapCenter(places);
  const markerIcon = createMarkerIcon();

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <MapContainer
        center={center}
        zoom={4}
        scrollWheelZoom={false}
        className="h-[420px] w-full bg-surface-2 [&_.leaflet-control-zoom]:border-border [&_.leaflet-control-zoom_a]:border-border [&_.leaflet-control-zoom_a]:bg-surface [&_.leaflet-control-zoom_a]:text-text [&_.leaflet-popup-content-wrapper]:rounded-md [&_.leaflet-popup-content-wrapper]:border [&_.leaflet-popup-content-wrapper]:border-border [&_.leaflet-popup-content-wrapper]:bg-surface [&_.leaflet-popup-content-wrapper]:text-text [&_.leaflet-popup-tip]:bg-surface"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div className="w-52 space-y-2">
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm border border-border">
                  <FunImage
                    src={place.thumbnail}
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-text">{place.name}</p>
                <p className="text-xs leading-relaxed text-muted">
                  {place.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
