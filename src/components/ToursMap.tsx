import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngExpression, Layer, Feature, StyleFunction } from "leaflet";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import osmtogeojson from "osmtogeojson";
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

// Stili dei sentieri
const hikingStyle = { color: "#A52A2A", weight: 5, opacity: 0.8 };
const bikeStyle = { color: "#008B8B", weight: 5, opacity: 0.8 };
const highlightStyle = { color: "#FFD700", weight: 5, opacity: 1 };

interface TrailFeature extends Feature {
  properties: {
    name?: string;
    ref?: string;
    route?: "hiking" | "bicycle";
    "osmc:symbol"?: string;
    [key: string]: any;
  };
}

const ToursMap: React.FC = () => {
  const [allTrails, setAllTrails] = useState<GeoJSON.FeatureCollection<
    any,
    TrailFeature["properties"]
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    hiking: true,
    bicycle: true,
  });

  const center: LatLngExpression = [43.47, 11.35];

  useEffect(() => {
    const fetchTrails = async () => {
      const bounds = "43.40,11.21,43.65,11.52";
      const query = `
        [out:json][timeout:25];
        (
          relation["route"~"^(hiking|bicycle)$"](${bounds});
        );
        out body;
        >;
        out skel qt;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        query
      )}`;
      try {
        const response = await fetch(url);
        const osmData = await response.json();
        const geojsonData = osmtogeojson(osmData) as GeoJSON.FeatureCollection<
          any,
          TrailFeature["properties"]
        >;
        setAllTrails(geojsonData);
      } catch (error) {
        console.error("Errore nel caricamento dei sentieri:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrails();
  }, []);

  const { hikingTrails, bicycleTrails } = useMemo(() => {
    const hiking: TrailFeature[] = [];
    const bicycle: TrailFeature[] = [];
    allTrails?.features.forEach((feature) => {
      if (feature.properties?.route === "hiking") {
        hiking.push(feature as TrailFeature);
      } else if (feature.properties?.route === "bicycle") {
        bicycle.push(feature as TrailFeature);
      }
    });
    return {
      hikingTrails: {
        type: "FeatureCollection",
        features: hiking,
      } as GeoJSON.FeatureCollection,
      bicycleTrails: {
        type: "FeatureCollection",
        features: bicycle,
      } as GeoJSON.FeatureCollection,
    };
  }, [allTrails]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  // Funzione migliorata che ora gestisce anche i popup
  const onEachFeature = (feature: TrailFeature, layer: Layer) => {
    // 1. Logica per l'evidenziazione (invariata)
    layer.on({
      mouseover: (e) => {
        e.target.setStyle(highlightStyle);
        e.target.bringToFront();
      },
      mouseout: (e) => {
        const style =
          feature.properties?.route === "hiking" ? hikingStyle : bikeStyle;
        e.target.setStyle(style);
      },
    });

    // 2. Nuova logica per creare e legare il popup
    const props = feature.properties;
    if (props) {
      let popupContent = `<b>${
        props.name || (props.route === "hiking" ? "Sentiero" : "Percorso Bici")
      }</b>`;
      if (props.ref) {
        popupContent += `<br/>Rif: ${props.ref}`;
      }
      if (props["osmc:symbol"]) {
        popupContent += `<br/>Segnavia: ${props["osmc:symbol"]}`;
      }
      layer.bindPopup(popupContent);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 5,
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>
          Caricamento dei sentieri del Chianti...
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        height: "70vh",
        width: "100%",
        overflow: "hidden",
      }}
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

        {/* I componenti GeoJSON ora non hanno più il Popup come figlio */}
        {filters.hiking && (
          <GeoJSON
            data={hikingTrails}
            style={hikingStyle as StyleFunction}
            onEachFeature={onEachFeature as any}
          />
        )}
        {filters.bicycle && (
          <GeoJSON
            data={bicycleTrails}
            style={bikeStyle as StyleFunction}
            onEachFeature={onEachFeature as any}
          />
        )}
      </MapContainer>

      {/* Box per Filtri e Legenda (invariato) */}
      <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
        <Paper
          elevation={4}
          sx={{ p: 2, backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Filtri
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.hiking}
                  onChange={handleFilterChange}
                  name="hiking"
                  color="warning"
                />
              }
              label="Trekking"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={filters.bicycle}
                  onChange={handleFilterChange}
                  name="bicycle"
                  color="secondary"
                />
              }
              label="Bicicletta"
            />
          </FormGroup>
          <hr style={{ margin: "16px 0" }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            Legenda
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <HikingIcon sx={{ color: hikingStyle.color, mr: 1 }} />
            <Typography variant="body2">Percorsi Trekking</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DirectionsBikeIcon sx={{ color: bikeStyle.color, mr: 1 }} />
            <Typography variant="body2">Percorsi Bici</Typography>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default ToursMap;
