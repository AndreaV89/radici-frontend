import React from "react";
import { Container, Box, Typography } from "@mui/material";
import ArticleCard from "../components/ArticleCard";
import { Post } from "../types";

export default function News() {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://radicinchiantibackend.local/wp-json/wp/v2/posts"
        );
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Errore nel caricamento degli articoli:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          News & Eventi
        </Typography>
        <hr />
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
}
