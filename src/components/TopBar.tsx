import React from "react";
import {
  Box,
  Container,
  Link as MuiLink,
  IconButton,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useWeather } from "../context/WeatherContext";
import WeatherIcon from "./WeatherIcon"; // 1. IMPORTIAMO WeatherIcon

const TopBar: React.FC = () => {
  const weatherData = useWeather();

  return (
    <Box sx={{ bgcolor: "transparent", py: 0.5, color: "white" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <MuiLink
            component={RouterLink}
            to="/webcam"
            variant="body2"
            sx={{
              color: "white",
              textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              mr: 3,
            }}
          >
            <VideocamIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
            Webcam
          </MuiLink>

          {weatherData && (
            <IconButton
              component={RouterLink}
              to="/meteo"
              aria-label="meteo"
              size="small"
              sx={{
                mr: 3,
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
              }}
            >
              {/* 2. USIAMO IL NOSTRO COMPONENTE WeatherIcon */}
              <WeatherIcon weatherCode={weatherData.weatherCode} width={28} />
              <Typography variant="body2" sx={{ ml: 1, fontWeight: "bold" }}>
                {weatherData.minTemp}°/{weatherData.maxTemp}°
              </Typography>
            </IconButton>
          )}

          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
            }}
          >
            IT / <b>EN</b>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TopBar;
