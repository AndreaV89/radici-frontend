import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// 1. MODIFICHIAMO L'INTERFACCIA
interface WeatherData {
  weatherCode: number;
  minTemp: number;
  maxTemp: number;
}

const WeatherContext = createContext<WeatherData | null>(null);

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const lat = 43.4866;
  const lon = 11.3791;

  useEffect(() => {
    // 2. USIAMO L'API DI OPEN-METEO
    const fetchWeatherData = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // 3. IMPOSTIAMO I NUOVI DATI
        if (data.daily) {
          setWeatherData({
            weatherCode: data.daily.weather_code[0],
            minTemp: Math.round(data.daily.temperature_2m_min[0]),
            maxTemp: Math.round(data.daily.temperature_2m_max[0]),
          });
        }
      } catch (error) {
        console.error("Errore caricamento dati meteo per TopBar:", error);
      }
    };
    fetchWeatherData();
  }, [lat, lon]);

  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
};
