import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
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
        <Box sx={{ my: 5 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ultime News & Eventi
          </Typography>
          <Grid container spacing={4}>
            {latestPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, md: 4 }}>
                <ArticleCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ my: 5 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Esplora il Territorio
          </Typography>
          <InteractiveMap />
        </Box>
      </Container>
    </>
  );
}
