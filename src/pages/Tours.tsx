import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import gpxParser from "gpxparser";
import { getPosts } from "../api";
import { Post } from "../types";
import { LatLngExpression } from "leaflet";

interface Tour extends Post {
  trackPoints?: LatLngExpression[];
  acf?: {
    traccia_gpx?: {
      url: string;
    };
    [key: string]: any;
  };
}

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const center: [number, number] = [43.47, 11.35];

  useEffect(() => {
    const fetchAndParseTours = async () => {
      console.log("1. Inizio a caricare le escursioni da WordPress...");
      try {
        const data = await getPosts("escursione");
        console.log("2. Dati ricevuti da WordPress:", data);

        if (data) {
          const parsedTours = await Promise.all(
            data.map(async (tour) => {
              if (tour.acf?.traccia_gpx?.url) {
                console.log(
                  `3. Trovato tour "${tour.title.rendered}" con URL GPX:`,
                  tour.acf.traccia_gpx.url
                );

                const response = await fetch(tour.acf.traccia_gpx.url);
                if (!response.ok) {
                  console.error(
                    `Errore nel download del file GPX per "${tour.title.rendered}". Status: ${response.status}`
                  );
                  return tour;
                }
                const gpxText = await response.text();

                const gpx = new gpxParser();
                gpx.parse(gpxText);
                console.log(
                  `4. File GPX per "${tour.title.rendered}" interpretato:`,
                  gpx
                );

                if (gpx.tracks.length > 0) {
                  const trackPoints = gpx.tracks[0].points.map((p) => [
                    p.lat,
                    p.lon,
                  ]);
                  console.log(
                    `5. Traccia per "${tour.title.rendered}" convertita in ${trackPoints.length} punti.`
                  );
                  return { ...tour, trackPoints };
                } else {
                  console.warn(
                    `Attenzione: Il file GPX per "${tour.title.rendered}" non contiene tracce valide.`
                  );
                }
              }
              return tour;
            })
          );
          setTours(parsedTours as Tour[]);
        }
      } catch (error) {
        console.error("ERRORE CRITICO durante il caricamento:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndParseTours();
  }, []);

  // ... il resto del codice rimane invariato ...

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Le Nostre Escursioni
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        Scopri i percorsi curati dalla nostra associazione.
      </Typography>

      <Paper
        elevation={3}
        sx={{ height: "70vh", width: "100%", overflow: "hidden" }}
      >
        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}{r}.png?apikey=${
              import.meta.env.VITE_THUNDERFOREST_API_KEY
            }`}
            attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {tours.map((tour) =>
            tour.trackPoints ? (
              <Polyline
                key={tour.id}
                positions={tour.trackPoints}
                color="#A52A2A"
                weight={5}
              >
                <Popup>{tour.title.rendered}</Popup>
              </Polyline>
            ) : null
          )}
        </MapContainer>
      </Paper>
    </Container>
  );
};

export default Tours;
