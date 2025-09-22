import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3, // Padding verticale (sopra e sotto)
        px: 2, // Padding orizzontale (destra e sinistra)
        mt: "auto", // Margin-top: auto spinge il footer in fondo alla pagina
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {"© "}
            {new Date().getFullYear()}
            {" Radici in Chianti. Tutti i diritti riservati."}
          </Typography>
          <Box>
            <IconButton
              aria-label="Facebook"
              color="inherit"
              component={Link}
              href="https://www.facebook.com/radicinchiantiaps"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              color="inherit"
              component={Link}
              href="https://www.instagram.com/radicinchianti/"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
