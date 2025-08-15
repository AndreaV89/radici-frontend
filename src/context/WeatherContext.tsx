import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

// Definiamo la "forma" dei nostri dati meteo
interface WeatherData {
  temp: number;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

// Creiamo il contesto
const WeatherContext = createContext<WeatherData | null>(null);

// Creiamo un hook personalizzato per usare facilmente il contesto
export const useWeather = () => useContext(WeatherContext);

// Questo è il componente che fornirà i dati
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const lat = 43.4866;
  const lon = 11.3791;

  useEffect(() => {
    if (!apiKey) return;

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = response.data;
        setWeatherData({
          temp: Math.round(data.main.temp),
          minTemp: Math.round(data.main.temp_min),
          maxTemp: Math.round(data.main.temp_max),
          icon: data.weather[0].icon,
        });
      } catch (error) {
        console.error("Errore caricamento dati meteo per TopBar:", error);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
};
