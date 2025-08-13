// In src/pages/Events.tsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { Post } from "../types";

export default function Events() {
  const [events, setEvents] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Chiamiamo l'endpoint per il custom post type "evento"
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/evento?_embed=true`
        );
        const data: Post[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Errore nel caricamento degli eventi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Prossimi Eventi
      </Typography>
      <hr />
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {events.length > 0 ? (
          events.map((event) => (
            <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link
                to={`/eventi/${event.slug}`}
                style={{ textDecoration: "none" }}
              >
                <ArticleCard post={event} />
              </Link>
            </Grid>
          ))
        ) : (
          <Typography sx={{ p: 4 }}>
            Nessun evento in programma al momento.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
