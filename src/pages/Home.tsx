import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import Hero from "../components/Hero";
import InteractiveMap from "../components/InteractiveMap";
import FeatureCard from "../components/FeatureCard";

const featuredSections = [
  {
    title: "I Nostri Progetti",
    imageUrl: "/images/progetti.jpg",
    linkTo: "/progetti",
  },
  {
    title: "Eventi nel Territorio",
    imageUrl: "/images/eventi.jpg",
    linkTo: "/eventi",
  },
  {
    title: "Escursioni",
    imageUrl: "/images/escursioni.jpg",
    linkTo: "/escursioni",
  },
  {
    title: "Chi Siamo",
    imageUrl: "/images/chi-siamo.jpg",
    linkTo: "/chi-siamo",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <Box sx={{ py: 8, bgcolor: "background.paper" }}>
        {" "}
        {/* RIDOTTO padding verticale */}
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ mb: 8, fontFamily: '"Playfair Display", serif' }}
          >
            Vivi il Chianti
          </Typography>
          <Grid container spacing={7}>
            {" "}
            {/* AUMENTATO lo spazio tra le card */}
            {featuredSections.map((section) => (
              <Grid size={{ xs: 12, sm: 6, md: 6 }} key={section.title}>
                <FeatureCard
                  title={section.title}
                  imageUrl={section.imageUrl}
                  linkTo={section.linkTo}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          py: 8,
          bgcolor: "background.default",
        }}
      >
        {" "}
        {/* RIDOTTO padding verticale */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 6, fontFamily: '"Playfair Display", serif' }}
        >
          Esplora la Mappa
        </Typography>
        <InteractiveMap />
      </Box>
    </>
  );
}
