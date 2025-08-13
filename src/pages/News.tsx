import React from "react";
import { Container, Box, Typography } from "@mui/material";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";
import { Post } from "../types";

export default function News() {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/wp-json/wp/v2/posts?per_page=10&_embed=true`
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
        <Typography variant="h3" component="h1" gutterBottom align="center">
          News
        </Typography>
        <hr />
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/news/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <ArticleCard post={post} />
          </Link>
        ))}
      </Box>
    </Container>
  );
}
