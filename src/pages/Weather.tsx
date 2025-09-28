import React, { useState, useEffect } from "react";
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
import WeatherIcon from "../components/WeatherIcon";

// La funzione getWeatherDescription e le interfacce non cambiano
const getWeatherDescription = (code: number): string => {
  switch (code) {
    case 0:
      return "Cielo sereno";
    case 1:
      return "Prevalentemente sereno";
    case 2:
      return "Parzialmente nuvoloso";
    case 3:
      return "Nuvoloso";
    case 45:
    case 48:
      return "Nebbia";
    case 51:
    case 53:
    case 55:
      return "Pioggerella";
    case 61:
      return "Pioggia leggera";
    case 63:
      return "Pioggia moderata";
    case 65:
      return "Pioggia forte";
    case 80:
      return "Rovescio leggero";
    case 81:
      return "Rovescio moderato";
    case 82:
      return "Rovescio violento";
    case 71:
      return "Neve leggera";
    case 73:
      return "Neve moderata";
    case 75:
      return "Neve forte";
    case 85:
    case 86:
      return "Rovescio di neve";
    case 95:
    case 96:
    case 99:
      return "Temporale";
    default:
      return "Condizioni miste";
  }
};

interface DailyForecast {
  dayName: string;
  formattedDate: string;
  weatherCode: number;
  description: string;
  tempMax: number;
  tempMin: number;
}

export default function Weather() {
  // 1. NUOVA GESTIONE DELLO STATO
  const [todayForecast, setTodayForecast] = useState<DailyForecast | null>(
    null
  );
  const [tomorrowForecast, setTomorrowForecast] =
    useState<DailyForecast | null>(null);
  const [followingDays, setFollowingDays] = useState<DailyForecast[]>([]);

  const [loading, setLoading] = useState(true);
  const locationName = "Chianti";
  const lat = 43.4866;
  const lon = 11.3791;

  useEffect(() => {
    const fetchWeather = async () => {
      // La chiamata API non cambia
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        // 2. ELABORIAMO I DATI E LI SUDDIVIDIAMO
        const allForecasts: DailyForecast[] = data.daily.time.map(
          (dateStr: string, index: number) => {
            const date = new Date(dateStr);
            return {
              dayName: date.toLocaleDateString("it-IT", { weekday: "long" }),
              formattedDate: date.toLocaleDateString("it-IT", {
                day: "numeric",
                month: "long",
              }),
              weatherCode: data.daily.weather_code[index],
              description: getWeatherDescription(
                data.daily.weather_code[index]
              ),
              tempMax: Math.round(data.daily.temperature_2m_max[index]),
              tempMin: Math.round(data.daily.temperature_2m_min[index]),
            };
          }
        );

        // Impostiamo gli stati separati
        setTodayForecast(allForecasts[0] || null);
        setTomorrowForecast(allForecasts[1] || null);
        setFollowingDays(allForecasts.slice(2)); // Tutti i giorni dal terzo in poi
      } catch (error) {
        console.error("Errore nel caricamento dei dati meteo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        {locationName}, il meteo in tempo reale
      </Typography>

      {/* 3. NUOVO LAYOUT CON DUE CARD GRANDI */}
      <Grid container spacing={4} sx={{ mb: 5 }}>
        {todayForecast && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: "center", height: "100%" }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Oggi
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {todayForecast.formattedDate}
              </Typography>
              <Box sx={{ my: 2 }}>
                <WeatherIcon
                  weatherCode={todayForecast.weatherCode}
                  width={100}
                />
              </Box>
              <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                {todayForecast.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 1,
                }}
              >
                <Typography variant="h5">
                  Min: <b>{todayForecast.tempMin}°</b>
                </Typography>
                <Typography variant="h5">
                  Max: <b>{todayForecast.tempMax}°</b>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}
        {tomorrowForecast && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: "center", height: "100%" }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Domani
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {tomorrowForecast.formattedDate}
              </Typography>
              <Box sx={{ my: 2 }}>
                <WeatherIcon
                  weatherCode={tomorrowForecast.weatherCode}
                  width={100}
                />
              </Box>
              <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                {tomorrowForecast.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 1,
                }}
              >
                <Typography variant="h5">
                  Min: <b>{tomorrowForecast.tempMin}°</b>
                </Typography>
                <Typography variant="h5">
                  Max: <b>{tomorrowForecast.tempMax}°</b>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Typography variant="h4" component="h2" gutterBottom align="center">
        Prossimi Giorni
      </Typography>
      <Grid container spacing={2}>
        {followingDays.map((day, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                >
                  {day.dayName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {day.formattedDate}
                </Typography>
                <Box sx={{ my: 1 }}>
                  <WeatherIcon weatherCode={day.weatherCode} width={64} />
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize", mb: 1 }}
                >
                  {day.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="body1">
                    Min: <b>{day.tempMin}°</b>
                  </Typography>
                  <Typography variant="body1">
                    Max: <b>{day.tempMax}°</b>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
