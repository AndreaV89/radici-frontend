import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Page } from "../types";

export default function Progetti() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        // L'endpoint per le pagine è diverso! Usiamo ?slug=... per trovare la pagina giusta.
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/pages?slug=progetti`
        );
        const data: Page[] = await response.json();

        // L'API restituisce un array, anche se c'è un solo risultato. Prendiamo il primo.
        if (data.length > 0) {
          setPageData(data[0]);
        }
      } catch (error) {
        console.error("Errore nel caricamento della pagina:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Se non troviamo la pagina, mostriamo un messaggio
  if (!pageData) {
    return <Typography>Pagina non trovata.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ my: 4, p: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          dangerouslySetInnerHTML={{ __html: pageData.title.rendered }}
        />
        <Box dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
      </Paper>
    </Container>
  );
}
