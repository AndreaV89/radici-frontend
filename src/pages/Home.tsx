import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import Hero from "../components/Hero";
import ArticleCard from "../components/ArticleCard";
import InteractiveMap from "../components/InteractiveMap";
import { Page, Post } from "../types";

export default function Home() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Eseguiamo due chiamate API in parallelo per efficienza!
        const [pageResponse, postsResponse] = await Promise.all([
          fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/wp-json/wp/v2/pages?slug=home&_embed=true`
          ),
          fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/wp-json/wp/v2/posts?per_page=3&_embed=true`
          ), // Prendi solo gli ultimi 3 articoli
        ]);

        const pageData: Page[] = await pageResponse.json();
        const postsData: Post[] = await postsResponse.json();

        if (pageData.length > 0) {
          setPageData(pageData[0]);
        }
        setLatestPosts(postsData);
      } catch (error) {
        console.error("Errore nel caricamento dei dati della Home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Hero />
      <Container maxWidth="lg">
        {/* Sezione con il contenuto della pagina Home */}
        {pageData && (
          <Box sx={{ my: 4, textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {pageData.title.rendered}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
            />
          </Box>
        )}

        {/* Sezione Ultime News */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2, // Mettiamo le news sopra alla mappa
            mb: -10, // Margine negativo per farle "galleggiare" sulla mappa sottostante
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Ultime News & Eventi
          </Typography>
          <Grid container spacing={4}>
            {latestPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, md: 4 }}>
                {/* Diamo uno sfondo solido alle card per non farle essere trasparenti sulla mappa */}
                <Paper elevation={4}>
                  <ArticleCard post={post} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>

      {/* Sezione Mappa a Piena Larghezza */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          pt: 20, // Padding superiore per fare spazio alle news che fluttuano sopra
          pb: 10,
          bgcolor: "#f5f5f5", // Un colore di sfondo per la sezione
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Esplora il Territorio
        </Typography>
        {/* La mappa ora vive in un contenitore che non ha i margini laterali */}
        <InteractiveMap />
      </Box>
    </>
  );
}
