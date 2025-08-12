import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Post } from "../types"; // Importiamo il nostro tipo!

// Definiamo i tipi delle "props" (le proprietà) che il nostro componente accetta
interface ArticleCardProps {
  post: Post;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
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
