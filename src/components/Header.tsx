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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import VideocamIcon from "@mui/icons-material/Videocam";

import { useWeather } from "../context/WeatherContext";
import WeatherIcon from "./WeatherIcon";

// 1. NUOVA STRUTTURA DATI: OGNI SOTTOVOCE HA LA SUA IMMAGINE
const menuItems = {
  chianti: {
    title: "Chianti",
    defaultImageUrl: "/images/escursioni.jpg", // Immagine di default per la sezione
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
        imageUrl: "/images/eventi.jpg",
      },
      {
        label: "Attività",
        linkTo: "/attivita",
        imageUrl: "//images/progetti.jpg",
      },
    ],
  },
  chiSiamo: {
    title: "Chi Siamo",
    defaultImageUrl: "/images/progetti.jpg", // Immagine di default per la sezione
    subItems: [
      {
        label: "La Nostra Storia",
        linkTo: "/chi-siamo",
        imageUrl: "/images/eventi.jpg",
      },
      {
        label: "Partners",
        linkTo: "/partners",
        imageUrl: "/images/progetti.jpg",
      },
      {
        label: "Sostienici",
        linkTo: "/sostienici",
        imageUrl: "/images/eventi.jpg",
      },
      {
        label: "Contatti",
        linkTo: "/contatti",
        imageUrl: "/images/eventi.jpg",
      },
    ],
  },
};

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null); // 2. NUOVO STATO PER L'IMMAGINE
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
  };

  const isTransparent = isHomePage && !isScrolled && openMenu === null;

  const currentData = openMenu
    ? menuItems[openMenu as keyof typeof menuItems]
    : null;
  // L'immagine da mostrare è quella dell'hover, altrimenti quella di default del menu aperto
  const displayImage = hoveredImage || currentData?.defaultImageUrl;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <AppBar
        position={isHomePage ? "fixed" : "sticky"}
        elevation={isScrolled || openMenu !== null ? 4 : 0}
        sx={{
          backgroundColor: isTransparent ? "transparent" : "background.default",
          color: isTransparent ? "white" : "text.primary",
          transition: "all 0.3s ease-in-out",
          "& .MuiToolbar-root": { minHeight: "120px" },
        }}
      >
        <Toolbar>
          <Box sx={{ flex: 1 }}>
            <RouterLink to="/">
              <Box
                component="img"
                src="/logo.png"
                alt="Logo Radici in Chianti"
                sx={{
                  height: "60px",
                  verticalAlign: "middle",
                  filter: "none",
                }}
              />
            </RouterLink>
          </Box>

          <Box
            sx={{ flex: 2, display: "flex", justifyContent: "center", gap: 4 }}
          >
            <Button
              onClick={() => handleMenuToggle("Chianti")}
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
              onClick={() => handleMenuToggle("Chi Siamo")}
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
                borderColor: "rgba(255, 255, 255, 0.3)",
                ml: 1,
                pl: 2,
              }}
            >
              <Button
                color="inherit"
                size="small"
                onClick={() => i18n.changeLanguage("it")}
                sx={{ fontWeight: i18n.language === "it" ? "bold" : "normal" }}
              >
                IT
              </Button>
              <Typography>/</Typography>
              <Button
                color="inherit"
                size="small"
                onClick={() => i18n.changeLanguage("en")}
                sx={{ fontWeight: i18n.language === "en" ? "bold" : "normal" }}
              >
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
              py: 7,
            }}
            onMouseLeave={() => setHoveredImage(null)} // Resetta l'immagine quando si esce dal menu
          >
            <Container>
              <Grid container spacing={5}>
                <Grid size={{ xs: 12, md: 4 }}>
                  {currentData?.subItems.map((item) => (
                    // 3. AGGIUNTO onMouseEnter A OGNI LINK
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
                        py: 1,
                        "&:hover": { pl: 1 },
                        transition: "padding-left 0.2s",
                      }}
                    >
                      {t(item.label.toLowerCase().replace(" ", ""))}
                    </MuiLink>
                  ))}
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: "250px",
                      // 4. L'IMMAGINE DIPENDE DALLO STATO DELL'HOVER
                      backgroundImage: `url(${displayImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 2,
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
