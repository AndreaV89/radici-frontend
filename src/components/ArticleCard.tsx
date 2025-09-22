import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Post } from "../types";
import { motion } from "framer-motion";

interface ArticleCardProps {
  post: Post;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {imageUrl && (
          <CardMedia
            component="img"
            image={imageUrl}
            alt={post.title.rendered}
            sx={{
              objectFit: "contain", // Aggiunta fondamentale!
            }}
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
    </motion.div>
  );
};

export default ArticleCard;
