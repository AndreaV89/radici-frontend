import { useState, useEffect } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";
import { Post } from "../types";
import { getPosts } from "../api";

export default function News() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts("posts", "per_page=10&_embed=true");
      if (data) {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
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
