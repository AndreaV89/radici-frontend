import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Paper,
  Grid,
  Container,
  Collapse,
  ClickAwayListener,
  IconButton,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VideocamIcon from "@mui/icons-material/Videocam";

import { useWeather } from "../context/WeatherContext";
import WeatherIcon from "./WeatherIcon";

const menuItems = {
  chianti: {
    title: "Chianti",
    defaultImageUrl: "/images/escursioni.jpg",
    subItems: [
      {
        label: "Eventi",
        linkTo: "/eventi",
        imageUrl: "/images/eventi.jpg",
      },
      {
        label: "Alloggi",
        linkTo: "/alloggi",
        imageUrl: "/images/progetti.jpg",
      },
      {
        label: "Progetti",
        linkTo: "/progetti",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Attività",
        linkTo: "/attivita",
        imageUrl: "/images/eventi.jpg",
      },
    ],
  },
  chiSiamo: {
    title: "Chi Siamo",
    defaultImageUrl: "/images/progetti.jpg",
    subItems: [
      {
        label: "La Nostra Storia",
        linkTo: "/chi-siamo",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Partners",
        linkTo: "/partners",
        imageUrl: "/images/eventi.jpg",
      },
      {
        label: "Sostienici",
        linkTo: "/sostienici",
        imageUrl: "/images/progetti.jpg",
      },
      {
        label: "Contatti",
        linkTo: "/contatti",
        imageUrl: "/images/escursioni.jpg",
      },
    ],
  },
};

const Header: React.FC = () => {
  const { t } = useTranslation(); // Rimuoviamo i18n se non serve per cambiare lingua qui
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const weatherData = useWeather();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [location]);

  const handleMenuToggle = (menuKey: string) => {
    setOpenMenu(openMenu === menuKey ? null : menuKey);
  };

  const handleClose = () => {
    setOpenMenu(null);
    setIsClosing(true);
    setTimeout(() => setIsClosing(false), 300);
  };

  const isTransparent = isHomePage && !isScrolled && openMenu === null;

  const currentData = openMenu
    ? menuItems[openMenu as keyof typeof menuItems]
    : null;
  const displayImage = hoveredImage || currentData?.defaultImageUrl;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <AppBar
        position={isHomePage ? "fixed" : "sticky"}
        elevation={isScrolled || openMenu !== null ? 4 : 0}
        sx={{
          backgroundColor: isTransparent ? "transparent" : "white",
          color: isTransparent ? "white" : "text.primary",
          transition: "all 0.3s ease-in-out",
          "& .MuiToolbar-root": { minHeight: "120px" },
        }}
      >
        <Toolbar
          sx={{ borderBottom: isTransparent ? 0 : 1, borderColor: "divider" }}
        >
          <Box sx={{ flex: 1 }}>
            <RouterLink to="/">
              <Box
                component="img"
                src="/logo.png"
                alt="Logo Radici in Chianti"
                sx={{
                  height: "60px",
                  verticalAlign: "middle",
                  filter: isTransparent ? "brightness(0) invert(1)" : "none",
                  transition: "filter 0.3s ease-in-out",
                }}
              />
            </RouterLink>
          </Box>

          <Box
            sx={{ flex: 2, display: "flex", justifyContent: "center", gap: 4 }}
          >
            <Button
              onClick={() => handleMenuToggle("chianti")}
              color="inherit"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Chianti
            </Button>
            <Button
              onClick={() => handleMenuToggle("chiSiamo")}
              color="inherit"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Chi Siamo
            </Button>
            <Button
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
              color="inherit"
              component={RouterLink}
              to="/escursioni"
            >
              Escursioni
            </Button>
            <Button
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
              color="inherit"
              component={RouterLink}
              to="/news"
            >
              News
            </Button>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* ... icone a destra ... */}
            <IconButton
              color="inherit"
              title="Webcam"
              component={RouterLink}
              to="/webcam"
            >
              <VideocamIcon />
            </IconButton>
            {weatherData && (
              <IconButton
                color="inherit"
                title="Meteo"
                component={RouterLink}
                to="/meteo"
              >
                <WeatherIcon weatherCode={weatherData.weatherCode} width={28} />
                <Typography
                  variant="body2"
                  sx={{ ml: 0.5, fontWeight: "bold" }}
                >
                  {weatherData.minTemp}°/{weatherData.maxTemp}°
                </Typography>
              </IconButton>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderLeft: 1,
                borderColor: isTransparent
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.12)",
                ml: 1,
                pl: 1,
              }}
            >
              <Button color="inherit" size="small">
                IT
              </Button>
              <Typography color="inherit">/</Typography>
              <Button color="inherit" size="small">
                EN
              </Button>
            </Box>
          </Box>
        </Toolbar>

        <Collapse in={openMenu !== null} timeout="auto" unmountOnExit>
          <Paper
            elevation={4}
            sx={{
              width: "100%",
              bgcolor: "background.default",
              color: "text.primary",
              py: 5,
              transition: "opacity 0.3s ease-in-out",
              opacity: openMenu !== null && !isClosing ? 1 : 0,
              boxShadow: "none",
            }}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <Container>
              <Grid container spacing={5} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                  {currentData?.subItems.map((item) => (
                    <MuiLink
                      component={RouterLink}
                      to={item.linkTo}
                      key={item.label}
                      underline="none"
                      onMouseEnter={() => setHoveredImage(item.imageUrl)}
                      sx={{
                        display: "block",
                        color: "text.primary",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        py: 2,
                        "&:hover": { pl: 1, color: "primary.main" },
                        transition: "all 0.2s",
                      }}
                    >
                      {/* SOLUZIONE: USIAMO DIRETTAMENTE L'ETICHETTA, SENZA TRADUZIONE QUI */}
                      {item.label}
                    </MuiLink>
                  ))}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      paddingTop: "60%",
                      position: "relative",
                      backgroundImage: `url(${displayImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "10px",
                      transition: "background-image 0.3s ease-in-out",
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Collapse>
      </AppBar>
    </ClickAwayListener>
  );
};

export default Header;
