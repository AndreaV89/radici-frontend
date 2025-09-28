import React from "react";

interface WeatherIconProps {
  weatherCode: number;
  width?: number;
  height?: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode, ...props }) => {
  const getIconFileName = () => {
    // Mappatura dei codici WMO ai nomi dei file delle icone
    switch (weatherCode) {
      case 0: // Clear sky
        return "clear-day.svg";
      case 1: // Mainly clear
      case 2: // Partly cloudy
        return "partly-cloudy-day.svg";
      case 3: // Overcast
        return "overcast-day.svg";
      case 45: // Fog
      case 48: // Depositing rime fog
        return "fog-day.svg";
      case 51: // Drizzle: Light
      case 53: // Drizzle: Moderate
      case 55: // Drizzle: Dense intensity
        return "drizzle.svg";
      case 61: // Rain: Slight
      case 80: // Rain showers: Slight
        return "partly-cloudy-day-rain.svg";
      case 63: // Rain: Moderate
      case 81: // Rain showers: Moderate
        return "rain.svg";
      case 65: // Rain: Heavy intensity
      case 82: // Rain showers: Violent
        return "extreme-rain.svg";
      case 71: // Snow fall: Slight
      case 73: // Snow fall: Moderate
      case 85: // Snow showers slight
        return "snow.svg";
      case 75: // Snow fall: Heavy intensity
      case 86: // Snow showers heavy
        return "extreme-snow.svg";
      case 95: // Thunderstorm
      case 96: // Thunderstorm with slight hail
      case 99: // Thunderstorm with heavy hail
        return "thunderstorms-extreme.svg";
      default:
        return "overcast.svg"; // Icona di default
    }
  };

  const iconSrc = `/weather-icons/${getIconFileName()}`;

  return (
    <img
      src={iconSrc}
      alt={`Icona meteo per codice ${weatherCode}`}
      {...props}
    />
  );
};

export default WeatherIcon;
