import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Post } from "../types";
import { Link } from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  Box,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import BusinessIcon from "@mui/icons-material/Business";
import HikingIcon from "@mui/icons-material/Hiking";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StorefrontIcon from "@mui/icons-material/Storefront";

const apiKey = import.meta.env.VITE_THUNDERFOREST_API_KEY;

// Funzione per creare icone colorate dinamicamente
const createStyledIcon = (IconComponent: React.ElementType, color: string) => {
  const iconSvgString = ReactDOMServer.renderToString(
    <IconComponent style={{ color: "white", fontSize: 18 }} />
  );

  const iconHtml = `
    <div style="
      background-color: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    ">
      ${iconSvgString}
    </div>
  `;

  return divIcon({
    html: iconHtml,
    className: "custom-map-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Funzione per creare cluster per le icone troppo vicine
const createClusterCustomIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  let size = "small"; // Puoi definire diverse dimensioni in base al conteggio
  if (count >= 10 && count < 100) size = "medium";
  if (count >= 100) size = "large";

  const iconHtml = ReactDOMServer.renderToString(
    <div
      style={{
        backgroundColor: "#6D1E20", // Usiamo il nostro rosso Chianti
        color: "white",
        borderRadius: "50%",
        width: "40px", // Puoi adattare queste dimensioni
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "14px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
      }}
    >
      {count}
    </div>
  );

  return divIcon({
    html: iconHtml,
    className: "marker-cluster-custom", // Una classe CSS opzionale se vuoi stili aggiuntivi
    iconSize: [40, 40], // Deve corrispondere alla larghezza/altezza nel CSS
    iconAnchor: [20, 20], // Centra l'icona
  });
};

// Creiamo le nostre icone personalizzate
const icons = {
  attivita: createStyledIcon(StorefrontIcon, "#7b1fa2"), // Viola
  progetto: createStyledIcon(AccountBalanceIcon, "#0288d1"), // Blu
  evento: createStyledIcon(EventIcon, "#d32f2f"), // Rosso
  partner: createStyledIcon(BusinessIcon, "#388e3c"), // Verde
  escursione: createStyledIcon(HikingIcon, "#f57c00"), // Arancione
  default: createStyledIcon(LocationOnIcon, "#757575"), // Grigio
};

// Definiamo il tipo per i nostri punti, aggiungendo il "type"
interface MapPoint extends Post {
  type: keyof typeof icons;
}

const filterOptions = {
  progetto: {
    label: "Progetti",
    color: "#0288d1",
    IconComponent: AccountBalanceIcon,
  },
  evento: { label: "Eventi", color: "#d32f2f", IconComponent: EventIcon },
  partner: { label: "Partners", color: "#388e3c", IconComponent: BusinessIcon },
  escursione: {
    label: "Escursioni",
    color: "#f57c00",
    IconComponent: HikingIcon,
  },
  attivita: {
    label: "Attività",
    color: "#7b1fa2",
    IconComponent: StorefrontIcon,
  },
};

export default function InteractiveMap() {
  const center: LatLngExpression = [43.47, 11.35];
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [filters, setFilters] = useState({
    progetto: true,
    evento: true,
    partner: true,
    escursione: true,
    attivita: true,
  });

  useEffect(() => {
    const fetchAllPoints = async () => {
      // Lista degli endpoint da interrogare
      const endpoints = [
        "progetto",
        "evento",
        "partner",
        "escursione",
        "attivita",
      ];

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
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "800px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}{r}.png?apikey=${apiKey}`}
      />
      {/* <TileLayer
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
      /> */}

      {/* FILTRI */}
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

      {/* LEGENDA */}
      <Box sx={{ position: "absolute", bottom: 10, left: 10, zIndex: 1000 }}>
        <Paper
          elevation={4}
          sx={{ p: 2, backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Legenda
          </Typography>
          {Object.entries(filterOptions).map(([key, value]) => {
            const IconComponent = value.IconComponent;
            return (
              <Box
                key={key}
                sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: value.color,
                    mr: 1,
                  }}
                >
                  <IconComponent sx={{ color: "white", fontSize: 18 }} />
                </Paper>
                <Typography variant="body2">{value.label}</Typography>
              </Box>
            );
          })}
        </Paper>
      </Box>

      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        chunkedLoading
      >
        {filteredPoints.map((point) => {
          if (point.acf?.latitudine && point.acf?.longitudine) {
            const position: LatLngExpression = [
              point.acf.latitudine,
              point.acf.longitudine,
            ];
            const imageUrl =
              point._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            let detailUrl = `/${point.type}s/${point.slug}`; // Aggiungiamo una 's' per il plurale
            if (point.type === "evento") detailUrl = `/eventi/${point.slug}`;
            if (point.type === "progetto")
              detailUrl = `/progetti/${point.slug}`;
            if (point.type === "attivita")
              detailUrl = `/attivita/${point.slug}`; // Supponendo che la rotta sia al singolare
            if (point.type === "escursione")
              detailUrl = `/escursioni/${point.slug}`;

            const isExternalLink =
              (point.type === "partner" || point.type === "attivita") &&
              point.acf?.sito_web;

            const popupContent = (() => {
              // Estraiamo il nome della categoria in modo sicuro
              const categoryName = point._embedded?.["wp:term"]?.[0]?.[0]?.name;

              console.log(categoryName);

              return (
                <Card
                  sx={{ border: "none", boxShadow: "none", minWidth: "220px" }}
                >
                  {imageUrl && (
                    <CardMedia
                      component="img"
                      height="120"
                      image={imageUrl}
                      alt={point.title.rendered}
                    />
                  )}
                  <CardContent sx={{ p: 1, pb: "8px !important" }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {point.type}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontSize: "1.1rem", lineHeight: "1.3", mt: 0.5 }}
                      dangerouslySetInnerHTML={{ __html: point.title.rendered }}
                    />
                    <Box sx={{ mt: 1 }}>
                      {point.acf?.luogo && (
                        <Typography variant="body2">
                          📍 {point.acf.luogo}
                        </Typography>
                      )}
                      {point.type === "evento" && point.acf?.data_evento && (
                        <Typography variant="body2">
                          🗓️{" "}
                          {new Date(point.acf.data_evento).toLocaleDateString(
                            "it-IT",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </Typography>
                      )}
                      {/* Usiamo la variabile 'categoryName' che abbiamo calcolato in modo sicuro */}
                      {point.type === "attivita" && categoryName && (
                        <Typography variant="body2">
                          🏷️ {categoryName}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              );
            })();

            return (
              <Marker
                key={point.id}
                position={position}
                icon={icons[point.type] || icons.default}
              >
                <Popup>
                  {isExternalLink ? (
                    <a
                      href={point.acf.sito_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {popupContent}
                    </a>
                  ) : (
                    <Link
                      to={detailUrl}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {popupContent}
                    </Link>
                  )}
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
