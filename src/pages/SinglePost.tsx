import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Post } from "../types";
import { getContentBySlug } from "../api";

interface SinglePostProps {
  postType:
    | "posts"
    | "progetto"
    | "evento"
    | "escursione"
    | "attivita"
    | "alloggio";
}

export default function SinglePost({ postType }: SinglePostProps) {
  // "useParams" legge i parametri dinamici dall'URL, come ":postSlug"
  const { postSlug } = useParams<{ postSlug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postSlug) return;

    const fetchPost = async () => {
      setLoading(true);
      const data = await getContentBySlug(postType, postSlug);

      // La nostra funzione restituisce un array, quindi prendiamo il primo elemento
      if (data && data.length > 0) {
        setPost(data[0]);
      }

      setLoading(false);
    };

    fetchPost();
  }, [postSlug, postType]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Container sx={{ my: 4 }}>
        <Typography>Articolo non trovato.</Typography>
      </Container>
    );
  }

  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ my: 4 }}>
        {imageUrl && (
          <Box
            component="img"
            src={imageUrl}
            alt={post.title.rendered}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        )}
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <Box dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </Box>
      </Paper>
    </Container>
  );
}
