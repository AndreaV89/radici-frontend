import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Avatar,
} from "@mui/material";
import { Page, Post } from "../types";
import { getPageBySlug, getMembers } from "../api";

export default function About() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [members, setMembers] = useState<Post[]>([]); // Stato per i membri
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageResult, membersResult] = await Promise.all([
          getPageBySlug("chi-siamo"),
          getMembers(),
        ]);
        if (pageResult && pageResult.length > 0) {
          setPageData(pageResult[0]);
        }
        if (membersResult) {
          setMembers(membersResult);
        }
      } catch (error) {
        console.error(
          "Errore nel caricamento dei dati della pagina Chi Siamo:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      {pageData && (
        <Paper elevation={3} sx={{ my: 4, p: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            dangerouslySetInnerHTML={{ __html: pageData.title.rendered }}
          />
          <Box
            dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
          />
        </Paper>
      )}

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5 }}>
        Il Nostro Team
      </Typography>
      <Grid container spacing={4}>
        {members.map((member) => (
          <Grid key={member.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper sx={{ p: 2, textAlign: "center", height: "100%" }}>
              <Avatar
                src={member._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "auto",
                  mb: 2,
                }}
              />
              <Typography
                variant="h6"
                dangerouslySetInnerHTML={{ __html: member.title.rendered }}
              />
              <Typography color="text.secondary" sx={{ fontWeight: "bold" }}>
                {member.acf?.ruolo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member.acf?.occupazione}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
