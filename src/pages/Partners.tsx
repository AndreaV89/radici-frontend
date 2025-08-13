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

export default function Partners() {
  const [partners, setPartners] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/partner?_embed=true`
        );
        const data: Post[] = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Errore nel caricamento dei partner:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
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
        I Nostri Partner
      </Typography>
      <hr />
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {partners.map((partner) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={partner.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                image={partner._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                alt={partner.title.rendered}
                sx={{ height: 140, objectFit: "contain", p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  dangerouslySetInnerHTML={{ __html: partner.title.rendered }}
                />
                <Typography variant="body2" color="text.secondary">
                  {partner.acf?.email && `Email: ${partner.acf.email}`}
                  <br />
                  {partner.acf?.telefono && `Tel: ${partner.acf.telefono}`}
                </Typography>
              </CardContent>
              <CardActions>
                {partner.acf?.sito_web && (
                  <Button
                    size="small"
                    href={partner.acf.sito_web}
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
