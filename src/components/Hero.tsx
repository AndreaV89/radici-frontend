import React from "react";
import { Box, Typography } from "@mui/material";

// URL di un'immagine segnaposto a tema colline toscane
const heroImageUrl =
  "https://images.unsplash.com/photo-1545569503-4e3a4e9e9f8f";

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        height: "60vh", // Altezza pari al 60% della finestra
        backgroundImage: `url(${heroImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "2px 2px 4px rgba(0,0,0,0.6)", // Ombra per leggibilità
      }}
    >
      <Typography variant="h2" component="h1" fontWeight="bold">
        Scopri l'Anima del Chianti
      </Typography>
    </Box>
  );
};

export default Hero;
