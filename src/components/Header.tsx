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
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";

import { useWeather } from "../context/WeatherContext";
import WeatherIcon from "./WeatherIcon";

const menuItems = {
  ilChianti: {
    title: "Il Chianti",
    defaultImageUrl: "/images/escursioni.jpg",
    subItems: [
      {
        label: "Storia e Tradizione",
        linkTo: "/storia-e-tradizione",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Eventi",
        linkTo: "/eventi",
        imageUrl: "/images/escursioni.jpg",
      },
      { label: "News", linkTo: "/news", imageUrl: "/images/escursioni.jpg" },
      {
        label: "Progetti",
        linkTo: "/progetti",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Negozi e Servizi",
        linkTo: "/attivita",
        imageUrl: "/images/escursioni.jpg",
      },
      { label: "Cerca il tuo alloggio", linkTo: "/alloggi", isButton: true }, // Bottone speciale
    ],
  },
  inCammino: {
    title: "In Cammino",
    defaultImageUrl: "/images/progetti.jpg",
    subItems: [
      {
        label: "Escursionismo",
        linkTo: "/escursioni",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Itinerari",
        linkTo: "/itinerari",
        imageUrl: "/images/escursioni.jpg",
      },
    ],
  },
  bici: {
    title: "Bici",
    defaultImageUrl: "/images/escursioni.jpg",
    subItems: [
      {
        label: "L'Eroica",
        linkTo: "/eroica",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Bici da strada",
        linkTo: "/bici-da-strada",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Fuori Strada",
        linkTo: "/fuori-strada",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Tutto per la bici",
        linkTo: "/servizi-bici",
        imageUrl: "/images/escursioni.jpg",
      },
    ],
  },
  chiSiamo: {
    title: "Chi Siamo",
    defaultImageUrl: "/images/escursioni.jpg",
    subItems: [
      {
        label: "L'associazione",
        linkTo: "/chi-siamo",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Membri",
        linkTo: "/chi-siamo#team",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Partners",
        linkTo: "/partners",
        imageUrl: "/images/escursioni.jpg",
      },
      {
        label: "Sostienici",
        linkTo: "/sostienici",
        imageUrl: "/images/escursioni.jpg",
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
        position="fixed"
        elevation={isScrolled || openMenu !== null ? 4 : 0}
        sx={{
          backgroundColor: isTransparent ? "transparent" : "background.default",
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
                  height: "90px",
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
              onClick={() => handleMenuToggle("ilChianti")}
              color="inherit"
              disableRipple
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "12px",
                  left: "8px",
                  right: "8px",
                  height: "2px",
                  backgroundColor: "primary.main",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease-in-out",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                  transition: "all 0.2s ease-in-out",
                  "&::after": {
                    transform: "scaleX(1)",
                  },
                },
              }}
            >
              Il Chianti
            </Button>
            <Button
              onClick={() => handleMenuToggle("inCammino")}
              color="inherit"
              disableRipple
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "12px",
                  left: "8px",
                  right: "8px",
                  height: "2px",
                  backgroundColor: "primary.main",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease-in-out",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                  transition: "all 0.2s ease-in-out",
                  "&::after": {
                    transform: "scaleX(1)",
                  },
                },
              }}
            >
              In Cammino
            </Button>
            <Button
              onClick={() => handleMenuToggle("bici")}
              color="inherit"
              disableRipple
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "12px",
                  left: "8px",
                  right: "8px",
                  height: "2px",
                  backgroundColor: "primary.main",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease-in-out",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                  transition: "all 0.2s ease-in-out",
                  "&::after": {
                    transform: "scaleX(1)",
                  },
                },
              }}
            >
              Bici
            </Button>
            <Button
              onClick={() => handleMenuToggle("chiSiamo")}
              color="inherit"
              disableRipple
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "12px",
                  left: "8px",
                  right: "8px",
                  height: "2px",
                  backgroundColor: "primary.main",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease-in-out",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                  transition: "all 0.2s ease-in-out",
                  "&::after": {
                    transform: "scaleX(1)",
                  },
                },
              }}
            >
              Chi Siamo
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
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.5,
                  transition: "all 0.2s ease-in-out",
                },
              }}
            >
              <VideocamIcon />
            </IconButton>
            {weatherData && (
              <IconButton
                color="inherit"
                title="Meteo"
                component={RouterLink}
                to="/meteo"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.5,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
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
              <Button
                color="inherit"
                size="small"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.5,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              >
                IT
              </Button>
              <Typography color="inherit">/</Typography>
              <Button
                color="inherit"
                size="small"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.5,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
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
                  {currentData?.subItems.map((item) =>
                    item.isButton ? ( // 3. LOGICA PER IL BOTTONE SPECIALE
                      <Box key={item.label} sx={{ mt: 2 }}>
                        <Button
                          component={RouterLink}
                          to={item.linkTo}
                          variant="contained"
                          color="primary"
                          size="large"
                          sx={{ fontWeight: "bold", borderRadius: "20px" }}
                        >
                          <KingBedOutlinedIcon sx={{ mr: 2 }} />
                          {item.label}
                        </Button>
                      </Box>
                    ) : (
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
                          "&:hover": { pl: 1, color: "primary.main" },
                          transition: "all 0.2s",
                        }}
                      >
                        {item.label}
                      </MuiLink>
                    )
                  )}
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
