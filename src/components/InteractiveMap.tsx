import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Post } from "../types";

import {
  Box,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

// Importiamo le icone che useremo per le diverse categorie
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Default
import EventIcon from "@mui/icons-material/Event";
import BusinessIcon from "@mui/icons-material/Business";
import HikingIcon from "@mui/icons-material/Hiking";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const apiKey = import.meta.env.VITE_THUNDERFOREST_API_KEY;

// Funzione per creare icone colorate dinamicamente
const createColoredIcon = (IconComponent: any, color: string) => {
  const iconHtml = ReactDOMServer.renderToString(
    <IconComponent style={{ color: color, fontSize: 32 }} />
  );
  return divIcon({
    html: iconHtml,
    className: "custom-map-icon", // Usiamo una classe per rimuovere lo sfondo di default
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Creiamo le nostre icone personalizzate
const icons = {
  progetto: createColoredIcon(AccountBalanceIcon, "#0288d1"), // Blu
  evento: createColoredIcon(EventIcon, "#d32f2f"), // Rosso
  partner: createColoredIcon(BusinessIcon, "#388e3c"), // Verde
  escursione: createColoredIcon(HikingIcon, "#f57c00"), // Arancione
  default: createColoredIcon(LocationOnIcon, "#757575"), // Grigio
};

// Definiamo il tipo per i nostri punti, aggiungendo il "type"
interface MapPoint extends Post {
  type: keyof typeof icons;
}

const filterOptions = {
  progetto: { label: "Progetti", color: "#0288d1" },
  evento: { label: "Eventi", color: "#d32f2f" },
  partner: { label: "Partners", color: "#388e3c" },
  escursione: { label: "Escursioni", color: "#f57c00" },
};

export default function InteractiveMap() {
  const center: LatLngExpression = [43.47, 11.35];
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [filters, setFilters] = useState({
    progetto: true,
    evento: true,
    partner: true,
    escursione: true,
  });

  useEffect(() => {
    const fetchAllPoints = async () => {
      // Lista degli endpoint da interrogare
      const endpoints = ["progetto", "evento", "partner", "escursione"];

      try {
        const responses = await Promise.all(
          endpoints.map(
            (type) =>
              fetch(
                `${
                  import.meta.env.VITE_API_BASE_URL
                }/wp-json/wp/v2/${type}?_embed=true`
              )
                .then((res) => res.json())
                .then((data) => data.map((item: Post) => ({ ...item, type }))) // Aggiungiamo il tipo a ogni elemento
          )
        );

        // Uniamo i risultati di tutte le chiamate in un unico array
        const allPoints = responses.flat();
        setPoints(allPoints);
      } catch (error) {
        console.error("Errore nel caricamento dei punti di interesse:", error);
      }
    };
    fetchAllPoints();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const filteredPoints = points.filter(
    (point) => filters[point.type as keyof typeof filters]
  );

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "800px", width: "100%", borderRadius: "8px" }}
    >
      {/* <TileLayer
        attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}{r}.png?apikey=${apiKey}`}
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
      />
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}.png"
        pane="shadowPane"
      />
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}.png"
        pane="markerPane"
      />

      <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
        <Paper
          elevation={4}
          sx={{ p: 2, backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Filtri
          </Typography>
          <FormGroup>
            {Object.entries(filterOptions).map(([key, value]) => (
              <FormControlLabel
                key={key}
                control={
                  <Switch
                    checked={filters[key as keyof typeof filters]}
                    onChange={handleFilterChange}
                    name={key}
                  />
                }
                label={value.label}
              />
            ))}
          </FormGroup>
        </Paper>
      </Box>

      <Box sx={{ position: "absolute", bottom: 10, left: 10, zIndex: 1000 }}>
        <Paper
          elevation={4}
          sx={{ p: 2, backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Legenda
          </Typography>
          {Object.entries(filterOptions).map(([key, value]) => (
            <Box
              key={key}
              sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: icons[key as keyof typeof icons].options.html ?? "",
                }}
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {value.label}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>

      {filteredPoints.map((point) => {
        if (point.acf?.latitudine && point.acf?.longitudine) {
          const position: LatLngExpression = [
            point.acf.latitudine,
            point.acf.longitudine,
          ];
          return (
            <Marker
              key={point.id}
              position={position}
              icon={icons[point.type] || icons.default}
            >
              <Popup>
                <b>{point.title.rendered}</b>
                <p>
                  {point.type.charAt(0).toUpperCase() + point.type.slice(1)}
                </p>
                {/* Potremmo aggiungere un link alla pagina di dettaglio qui */}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}
