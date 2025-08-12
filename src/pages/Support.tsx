import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Snackbar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Page } from "../types";

export default function Support() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Stato per il messaggio di conferma

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/pages?slug=sostienici`
        );
        const data: Page[] = await response.json();
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

  const handleCopyIban = () => {
    if (pageData?.acf?.iban) {
      navigator.clipboard.writeText(pageData.acf.iban);
      setSnackbarOpen(true); // Mostra il messaggio di conferma
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

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

        {/* Sezione speciale per l'IBAN se esiste */}
        {pageData.acf?.iban && (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{ fontFamily: "monospace" }}
            >
              {pageData.acf.iban}
            </Typography>
            <Button
              variant="contained"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopyIban}
            >
              Copia
            </Button>
          </Paper>
        )}
      </Paper>
      {/* Componente per notifica "copiato!" */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="IBAN copiato negli appunti!"
      />
    </Container>
  );
}
