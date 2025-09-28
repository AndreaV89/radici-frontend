import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  imageUrl: string;
  linkTo: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  imageUrl,
  linkTo,
}) => {
  return (
    <Link
      to={linkTo}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        height: "100%",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          position: "relative",
          height: "100%",
          minHeight: "400px",
          color: "white",
          display: "flex",
          alignItems: "flex-end",
          padding: 3,
          borderRadius: 2,
          overflow: "hidden", // Cruciale per contenere lo zoom
          // Spostiamo l'hover effect direttamente qui
          "&:hover .bg-image": {
            // Selezioniamo l'elemento con la classe .bg-image all'hover
            transform: "scale(1.05)",
          },
        }}
      >
        {/* Elemento per l'immagine di sfondo */}
        <Box
          className="bg-image" // Diamo una classe per poterlo selezionare
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 0.4s ease-out", // Aggiungiamo una transizione fluida
            transform: "scale(1)", // Stato iniziale
          }}
        />

        {/* Overlay scuro per leggibilità */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          }}
        />

        {/* Titolo */}
        <Typography
          variant="h4"
          component="h3"
          sx={{
            position: "relative",
            zIndex: 1,
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            fontFamily: '"Playfair Display", serif',
          }}
        >
          {title}
        </Typography>
      </Paper>
    </Link>
  );
};

export default FeatureCard;
