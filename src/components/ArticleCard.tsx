import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Post } from "../types"; // Importiamo il nostro tipo!

// Definiamo i tipi delle "props" (le proprietà) che il nostro componente accetta
interface ArticleCardProps {
  post: Post;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    // Il Link punta alla rotta dinamica, usando lo slug del post
    <Link
      to={`/news/${post.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{ mb: 2, display: "flex", flexDirection: "column", height: "100%" }}
      >
        {imageUrl && (
          <CardMedia
            component="img"
            height="194"
            image={imageUrl}
            alt={post.title.rendered}
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
    </Link>
  );
};

export default ArticleCard;
