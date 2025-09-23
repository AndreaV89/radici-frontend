import { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { getPageBySlug, getLatestPosts, getUpcomingEvents } from "../api";

export default function Home() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [pageResult, postsResult, eventsResult] = await Promise.all([
          getPageBySlug("home"),
          getLatestPosts(),
          getUpcomingEvents(),
        ]);

        if (pageResult && pageResult.length > 0) {
          setPageData(pageResult[0]);
        }
        if (postsResult) {
          setLatestPosts(postsResult);
        }
        if (eventsResult) {
          setUpcomingEvents(eventsResult);
        }
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
        {pageData && (
          <Box sx={{ my: 6, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              dangerouslySetInnerHTML={{ __html: pageData.title.rendered }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
            />
          </Box>
        )}
      </Container>

      {/* 3. SEZIONE "ULTIME NEWS" */}
      <Box
        sx={{
          py: 6,
          boxShadow:
            "inset 0 8px 8px -8px rgba(0,0,0,0.2), inset 0 -8px 8px -8px rgba(0,0,0,0.2)",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom>
            Ultime News
          </Typography>
          <Grid container spacing={4}>
            {latestPosts.map((post) => (
              <Grid size={{ xs: 12, md: 4 }} key={post.id}>
                <Link
                  to={`/news/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <ArticleCard post={post} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. SEZIONE "PROSSIMI EVENTI" */}
      <Box sx={{ py: 6, bgcolor: "#f5f5f5" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom>
            Prossimi Eventi
          </Typography>
          <Grid container spacing={4}>
            {upcomingEvents.map((event) => (
              <Grid size={{ xs: 12, md: 4 }} key={event.id}>
                <Link
                  to={`/eventi/${event.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <ArticleCard post={event} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sezione Mappa a Piena Larghezza */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          py: 10,
          boxShadow:
            "inset 0 8px 8px -8px rgba(0,0,0,0.2), inset 0 -8px 8px -8px rgba(0,0,0,0.2)",
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
        <InteractiveMap />
      </Box>
    </>
  );
}
