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
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Post } from "../types";
import { getPosts } from "../api";

export default function Accommodations() {
  const [accommodations, setAccommodations] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccommodations = async () => {
      const data = await getPosts("alloggio");
      if (data) {
        setAccommodations(data);
      }
      setLoading(false);
    };
    fetchAccommodations();
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
        Dove Dormire
      </Typography>
      <hr />
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {accommodations.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Link
              to={`/alloggi/${item.slug}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                  alt={item.title.rendered}
                />
                <CardContent>
                  {item.acf?.tipologia && (
                    <Chip
                      label={item.acf.tipologia}
                      color="primary"
                      sx={{ mb: 1 }}
                    />
                  )}
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title.rendered}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.acf?.descrizione_breve}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
