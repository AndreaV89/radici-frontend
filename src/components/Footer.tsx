import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Colonna 1: Logo e Descrizione */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <img
              src="/logo.png"
              alt="Logo Radici in Chianti"
              style={{ height: "70px", marginBottom: "16px" }}
            />
            <Typography variant="body2" color="text.secondary">
              Radici in Chianti APS è un'associazione di promozione sociale che
              opera per la valorizzazione e la tutela del territorio del
              Chianti.
            </Typography>
          </Grid>

          {/* Colonna 2: Il Chianti */}
          <Grid size={{ xs: 6, sm: 2, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Il Chianti
            </Typography>
            <Link
              component={RouterLink}
              to="/eventi"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Eventi
            </Link>
            <Link
              component={RouterLink}
              to="/alloggi"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Alloggi
            </Link>
            <Link
              component={RouterLink}
              to="/progetti"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Progetti
            </Link>
          </Grid>

          {/* Colonna 3: In Cammino & Bici */}
          <Grid size={{ xs: 6, sm: 2, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Outdoor
            </Typography>
            <Link
              component={RouterLink}
              to="/escursioni"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              In Cammino
            </Link>
            <Link
              component={RouterLink}
              to="/bici"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Bici
            </Link>
          </Grid>

          {/* Colonna 4: L'Associazione */}
          <Grid size={{ xs: 6, sm: 2, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Chi Siamo
            </Typography>
            <Link
              component={RouterLink}
              to="/chi-siamo"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              L'associazione
            </Link>
            <Link
              component={RouterLink}
              to="/partners"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Partners
            </Link>
            <Link
              component={RouterLink}
              to="/sostienici"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Sostienici
            </Link>
            <Link
              component={RouterLink}
              to="/contatti"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Contatti
            </Link>
          </Grid>

          {/* Colonna 5: Contatti Diretti */}
          <Grid size={{ xs: 12, sm: 2, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contatti
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Via Baccio Bandinelli, 49
              <br />
              53013
              <br />
              Gaiole in Chianti (SI)
            </Typography>
            <Link
              href="mailto:info@radicinchianti.it"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              info@radicinchianti.it
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: { xs: 2, sm: 0 } }}
          >
            {"© "}
            {new Date().getFullYear()}
            {" Radici in Chianti APS. Tutti i diritti riservati."}
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
