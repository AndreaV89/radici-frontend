import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Post } from "../types";
import { motion } from "framer-motion";

interface ArticleCardProps {
  post: Post;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // Ora il componente restituisce solo la Card, senza essere un link.
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }} // 3. Aggiungi l'animazione: si ingrandisce e si solleva leggermente
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
    </motion.div>
  );
};

export default ArticleCard;
