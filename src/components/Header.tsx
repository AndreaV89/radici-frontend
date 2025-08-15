import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import TopBar from "./TopBar";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isTransparent = isHomePage && !isScrolled;

  return (
    <AppBar
      position={isHomePage ? "fixed" : "sticky"}
      elevation={isScrolled ? 4 : 0}
      sx={{
        backgroundColor: isTransparent ? "transparent" : "primary.main",
        transition:
          "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
    >
      <Box
        sx={{
          bgcolor: !isTransparent ? "rgba(0,0,0,0.1)" : "transparent",
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <TopBar />
      </Box>
      <Toolbar sx={{ minHeight: "80px" }}>
        {/* 2. Sostituisci Typography con l'immagine del logo */}
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Box
              component="img"
              src="/logo.png"
              alt="Logo Radici in Chianti"
              sx={{
                height: "60px", // Imposta l'altezza desiderata
                verticalAlign: "middle", // Allinea bene l'immagine
                my: 3,
                filter: "brightness(0) invert(1)",
              }}
            />
          </Link>
        </Box>

        <Box>
          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/news"
          >
            News
          </Button>

          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/eventi"
          >
            Eventi
          </Button>

          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/chi-siamo"
          >
            Chi Siamo
          </Button>
          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/partners"
          >
            Partners
          </Button>
          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/progetti"
          >
            Progetti
          </Button>
          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/sostienici"
          >
            Sostienici
          </Button>
          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/contatti"
          >
            Contatti
          </Button>
          <Button
            sx={{ fontSize: "1rem" }}
            color="inherit"
            component={Link}
            to="/escursioni"
          >
            Escursioni
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
