import { useState, useEffect } from "react";
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
import { getPosts } from "../api";

export default function Projects() {
  const [projects, setProjects] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getPosts("progetto");
      if (data) {
        setProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
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
        I Nostri Progetti
      </Typography>
      <hr />
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link
                to={`/progetti/${project.slug}`}
                style={{ textDecoration: "none" }}
              >
                <ArticleCard post={project} />
              </Link>
            </Grid>
          ))
        ) : (
          <Typography sx={{ p: 4 }}>
            Nessun progetto da mostrare al momento.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
