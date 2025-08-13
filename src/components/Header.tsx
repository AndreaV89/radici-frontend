import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* 2. Sostituisci Typography con l'immagine del logo */}
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Box
              component="img"
              src="/logo.png"
              alt="Logo Radici in Chianti"
              sx={{
                height: "45px", // Imposta l'altezza desiderata
                verticalAlign: "middle", // Allinea bene l'immagine
                filter: "brightness(0) invert(1)",
              }}
            />
          </Link>
        </Box>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/news">
            News
          </Button>

          <Button color="inherit" component={Link} to="/eventi">
            Eventi
          </Button>

          <Button color="inherit" component={Link} to="/chi-siamo">
            Chi Siamo
          </Button>
          <Button color="inherit" component={Link} to="/partners">
            Partners
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
          <Button color="inherit" component={Link} to="/escursioni">
            Escursioni
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
