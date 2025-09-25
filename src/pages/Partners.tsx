import { useState, useEffect } from "react";
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
// 1. IMPORTIAMO LA NOSTRA FUNZIONE API
import { getPosts } from "../api";

export default function Partners() {
  const [partners, setPartners] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      // 2. USIAMO LA FUNZIONE getPosts SPECIFICANDO IL TIPO "partner"
      const data = await getPosts("partner");
      if (data) {
        setPartners(data);
      }
      setLoading(false);
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
