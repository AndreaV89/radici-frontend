import React from "react";
import { Box, Typography } from "@mui/material";

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative", // Necessario per posizionare il video e il testo
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        overflow: "hidden", // Nasconde parti del video che escono dal box
      }}
    >
      {/* Contenitore per il video di sfondo */}
      <Box
        component="video"
        src="/hero-video.mp4" // Vite serve i file dalla cartella 'public' alla radice '/'
        autoPlay
        loop
        muted
        playsInline // Importante per la compatibilità mobile
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          objectFit: "cover", // Fa in modo che il video copra tutto lo spazio
          zIndex: -1, // Mette il video dietro al testo
          filter: "brightness(0.6)", // Aggiunge un velo scuro per migliorare la leggibilità
        }}
      />
      <Typography
        variant="h2"
        component="h1"
        fontWeight="bold"
        align="center"
        sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
      >
        Scopri l'Anima del Chianti
      </Typography>
    </Box>
  );
};

export default Hero;
