import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Radici in Chianti
        </Typography>

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
