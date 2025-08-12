import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Post } from "../types"; // Importiamo il nostro tipo!

// Definiamo i tipi delle "props" (le proprietà) che il nostro componente accetta
interface ArticleCardProps {
  post: Post;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <Card sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
      {/* Mostriamo CardMedia solo se imageUrl esiste */}
      {imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt={
            post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
            post.title.rendered
          }
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          component="h2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
