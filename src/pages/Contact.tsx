import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Page } from "../types";

export default function Contact() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/pages?slug=contatti`
        );
        const data: Page[] = await response.json();
        if (data.length > 0) {
          setPageData(data[0]);
        }
      } catch (error) {
        console.error("Errore nel caricamento della pagina Contatti:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Per ora, il form non invierà email. Mostriamo solo i dati in console.
    const formData = new FormData(event.currentTarget);
    console.log({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });
    alert("Grazie per il tuo messaggio! (Funzionalità in costruzione)");
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
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Contattaci
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 5 }}
      >
        Siamo a tua disposizione per qualsiasi domanda o proposta.
      </Typography>

      <Grid container spacing={5}>
        {/* Colonna sinistra: Info e Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Informazioni
            </Typography>
            <List>
              {pageData.acf?.indirizzo && (
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Indirizzo"
                    secondary={pageData.acf.indirizzo}
                  />
                </ListItem>
              )}
              {pageData.acf?.email_pubblica && (
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={pageData.acf.email_pubblica}
                  />
                </ListItem>
              )}
              {pageData.acf?.telefono && (
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Telefono"
                    secondary={pageData.acf.telefono}
                  />
                </ListItem>
              )}
            </List>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <TextField
                name="name"
                label="Il tuo nome"
                required
                fullWidth
                margin="normal"
              />
              <TextField
                name="email"
                label="La tua email"
                type="email"
                required
                fullWidth
                margin="normal"
              />
              <TextField
                name="message"
                label="Messaggio"
                required
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                Invia Messaggio
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Colonna destra: Mappa */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
          {pageData?.acf?.codice_embed_Maps && (
            <Paper
              elevation={3} // L'ombreggiatura, come per le altre card
              sx={{
                flexGrow: 1, // Fa in modo che il Paper riempia lo spazio della Grid
                overflow: "hidden", // Nasconde eventuali bordi dell'iframe
                "& iframe": {
                  width: "100%",
                  height: "100%",
                  border: 0,
                },
              }}
            >
              <div
                style={{ width: "100%", height: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: pageData.acf.codice_embed_Maps,
                }}
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
