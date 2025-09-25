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
// 1. IMPORTIAMO LA NOSTRA FUNZIONE API
import { getPageBySlug } from "../api";

export default function Contact() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      // 2. USIAMO LA FUNZIONE getPageBySlug
      const data = await getPageBySlug("contatti");
      if (data && data.length > 0) {
        setPageData(data[0]);
      }
      setLoading(false);
    };
    fetchPage();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    return (
      <Container sx={{ my: 4 }}>
        <Typography>Pagina non trovata.</Typography>
      </Container>
    );
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

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
          {pageData?.acf?.codice_embed_Maps && (
            <Paper
              elevation={3}
              sx={{
                flexGrow: 1,
                overflow: "hidden",
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
