import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Post } from "../types";

interface SinglePostProps {
  postType: "posts" | "progetto";
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
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/${postType}?slug=${postSlug}&_embed=true`
        );
        const data: Post[] = await response.json();
        if (data.length > 0) {
          setPost(data[0]);
        }
      } catch (error) {
        console.error(`Errore nel caricamento di ${postType}:`, error);
      } finally {
        setLoading(false);
      }
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
    return <Typography>Articolo non trovato.</Typography>;
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
