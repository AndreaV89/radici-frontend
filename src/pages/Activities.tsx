import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Post } from "../types";

export default function Activities() {
  const [activities, setActivities] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/attivita?_embed=true`
        );
        const data: Post[] = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Errore nel caricamento dei partner:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
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
        Attività
      </Typography>
      <hr />
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {activities.map((activity) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                image={
                  activity._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                }
                alt={activity.title.rendered}
                sx={{ height: 140, objectFit: "contain", p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  dangerouslySetInnerHTML={{ __html: activity.title.rendered }}
                />
                <Typography variant="body2" color="text.secondary">
                  {activity.acf?.email && `Email: ${activity.acf.email}`}
                  <br />
                  {activity.acf?.telefono && `Tel: ${activity.acf.telefono}`}
                </Typography>
              </CardContent>
              <CardActions>
                {activity.acf?.sito_web && (
                  <Button
                    size="small"
                    href={activity.acf.sito_web}
                    target="_blank"
                  >
                    Visita il Sito
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
