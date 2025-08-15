import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { PointOfInterest } from "../types";

const apikey = import.meta.env.VITE_THUNDERFOREST_API_KEY;

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const InteractiveMap: React.FC = () => {
  // Coordinate approssimative del centro del Chianti
  const center: LatLngExpression = [43.47, 11.35];
  const [points, setPoints] = useState<PointOfInterest[]>([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/punto_interesse?_embed=true`
        );
        const data: PointOfInterest[] = await response.json();

        setPoints(data);
      } catch (error) {
        console.error("Errore nel caricamento dei punti di interesse:", error);
      }
    };
    fetchPoints();
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}{r}.png?apikey=${apikey}`}
      />
      {/* Mappiamo i punti di interesse per creare i Marker */}
      {points.map((point) => {
        // Controlliamo che le coordinate esistano prima di creare il marker
        if (point.acf?.latitudine && point.acf?.longitudine) {
          const position: LatLngExpression = [
            point.acf.latitudine,
            point.acf.longitudine,
          ];
          return (
            <Marker key={point.id} position={position} icon={customIcon}>
              <Popup>
                <b>{point.title.rendered}</b>
                <br />
                <div
                  dangerouslySetInnerHTML={{ __html: point.content.rendered }}
                />
              </Popup>
            </Marker>
          );
        }
        return null; // Non renderizzare nulla se mancano le coordinate
      })}
    </MapContainer>
  );
};

export default InteractiveMap;
