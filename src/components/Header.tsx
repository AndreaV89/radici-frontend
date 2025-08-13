import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../assets/logo.png"; // 1. Importa il logo

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* 2. Sostituisci Typography con l'immagine del logo */}
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Box
              component="img"
              src="../assets/logo.png"
              alt="Logo Radici in Chianti"
              sx={{
                height: "45px", // Imposta l'altezza desiderata
                verticalAlign: "middle", // Allinea bene l'immagine
              }}
            />
          </Link>
        </Box>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/news">
            News & Eventi
          </Button>
          <Button color="inherit" component={Link} to="/chi-siamo">
            Chi Siamo
          </Button>
          <Button color="inherit" component={Link} to="/progetti">
            Progetti
          </Button>
          <Button color="inherit" component={Link} to="/sostienici">
            Sostienici
          </Button>
          <Button color="inherit" component={Link} to="/contatti">
            Contatti
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
