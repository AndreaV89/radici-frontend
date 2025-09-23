import React from "react";
import { Container, Box, Typography } from "@mui/material";
import ToursMap from "../components/ToursMap"; // Importiamo il nostro nuovo componente

const Tours = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Esplora i Sentieri del Chianti
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        Scopri i percorsi per escursioni a piedi e in bicicletta che
        attraversano il nostro meraviglioso territorio. Clicca su un sentiero
        per visualizzarne i dettagli.
      </Typography>

      <ToursMap />
    </Container>
  );
};

export default Tours;
