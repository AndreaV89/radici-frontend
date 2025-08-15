import React, { useState, useEffect, ReactElement } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

// Importiamo un set di icone da Material-UI
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain"; // Per la pioggia
import AcUnitIcon from "@mui/icons-material/AcUnit"; // Per la neve
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import FoggyIcon from "@mui/icons-material/Foggy";

interface CurrentWeather {
  name: string;
  main: { temp: number };
  weather: { main: string; description: string; icon: string }[];
}
interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: { temp: number };
  weather: { main: string; description: string; icon: string }[];
}
interface DailyForecast {
  dayName: string;
  temp: number;
  icon: string;
  description: string;
  weather: { main: string }[];
}

// 1. FUNZIONE PER SELEZIONARE L'ICONA CORRETTA
const getWeatherIcon = (
  weatherMain: string,
  size: "large" | "medium"
): ReactElement => {
  const iconStyle = {
    fontSize: size === "large" ? 100 : 40,
    color: "primary.main",
  };

  switch (weatherMain) {
    case "Clear":
      return <WbSunnyIcon sx={iconStyle} />;
    case "Clouds":
      return <CloudIcon sx={iconStyle} />;
    case "Rain":
    case "Drizzle":
      return <GrainIcon sx={iconStyle} />;
    case "Snow":
      return <AcUnitIcon sx={iconStyle} />;
    case "Thunderstorm":
      return <ThunderstormIcon sx={iconStyle} />;
    default: // Mist, Smoke, Haze, etc.
      return <FoggyIcon sx={iconStyle} />;
  }
};

export default function Weather() {
  // ... la logica di fetch e gli stati rimangono invariati ...
  const [today, setToday] = useState<DailyForecast | null>(null);
  const [tomorrow, setTomorrow] = useState<DailyForecast | null>(null);
  const [followingDays, setFollowingDays] = useState<DailyForecast[]>([]);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const lat = 43.4866;
  const lon = 11.3791;

  // La useEffect rimane identica a prima
  useEffect(() => {
    const fetchWeather = async () => {
      if (!apiKey) {
        console.error("API Key di OpenWeather non trovata!");
        setLoading(false);
        return;
      }
      try {
        // Torniamo a usare le due chiamate separate che funzionano con la chiave gratuita
        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get<CurrentWeather>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=it`
          ),
          axios.get<{ list: ForecastItem[] }>(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=it`
          ),
        ]);

        setLocationName(currentResponse.data.name);

        // Processiamo i dati per "Oggi"
        setToday({
          dayName: new Date().toLocaleDateString("it-IT", { weekday: "long" }),
          temp: Math.round(currentResponse.data.main.temp),
          icon: currentResponse.data.weather[0].icon,
          description: currentResponse.data.weather[0].description,
        });

        // Processiamo i dati per "Domani" e i giorni successivi dalla lista delle previsioni
        const forecastList = forecastResponse.data.list;
        const tomorrowData = forecastList.find((item) => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return (
            item.dt_txt.startsWith(tomorrow.toISOString().split("T")[0]) &&
            item.dt_txt.includes("12:00:00")
          );
        });

        if (tomorrowData) {
          setTomorrow({
            dayName: new Date(tomorrowData.dt * 1000).toLocaleDateString(
              "it-IT",
              { weekday: "long" }
            ),
            temp: Math.round(tomorrowData.main.temp),
            icon: tomorrowData.weather[0].icon,
            description: tomorrowData.weather[0].description,
          });
        }

        const dailyForecasts: DailyForecast[] = [];
        const processedDays: string[] = [];
        forecastList.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          const todayStr = new Date().toISOString().split("T")[0];
          const tomorrowStr = tomorrowData?.dt_txt.split(" ")[0] || "";
          if (
            !processedDays.includes(date) &&
            date !== todayStr &&
            date !== tomorrowStr
          ) {
            processedDays.push(date);
            dailyForecasts.push({
              dayName: new Date(item.dt * 1000).toLocaleDateString("it-IT", {
                weekday: "short",
              }),
              temp: Math.round(item.main.temp),
              icon: item.weather[0].icon,
              description: item.weather[0].description,
            });
          }
        });
        setFollowingDays(dailyForecasts.slice(0, 4));
      } catch (error) {
        console.error("Errore nel caricamento dei dati meteo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  // La parte JSX viene aggiornata per usare le nuove icone e descrizioni
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Meteo a {locationName}
      </Typography>

      {/* Sezione OGGI */}
      {today && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4">Oggi, {today.dayName}</Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getWeatherIcon(today.weather[0].main, "large")}
                <Typography variant="h1" component="p" sx={{ ml: 2 }}>
                  {today.temp}°C
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                {today.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Sezione DOMANI - Aggiunto controllo "tomorrow &&" */}
      {tomorrow && (
        <Paper elevation={3} sx={{ p: 3, mb: 5 }}>
          <Typography variant="h4">Domani, {tomorrow.dayName}</Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getWeatherIcon(tomorrow.weather[0].main, "large")}
                <Typography variant="h1" component="p" sx={{ ml: 2 }}>
                  {tomorrow.temp}°C
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                {tomorrow.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Sezione PROSSIMI GIORNI */}
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Prossimi Giorni
      </Typography>
      <Grid container spacing={2}>
        {followingDays.map((day, index) => (
          <Grid size={{ xs: 6, sm: 3 }} key={index}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {day.dayName}
                </Typography>
                {getWeatherIcon(day.weather[0].main, "medium")}
                <Typography variant="h5">{day.temp}°C</Typography>
                {/* 3. AGGIUNGIAMO LA DESCRIZIONE TESTUALE */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize", mt: 1 }}
                >
                  {day.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
