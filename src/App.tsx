import React, { useState } from "react";
import './App.css';
import axios from "axios";
import CitySearch from './CitySearch';

type City = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type Weather = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

type WeatherApiResponse = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
};

// Fonction pour obtenir la description de la météo en fonction du code météo
function getWeatherDescription(code: number): string {
  switch (code) {
    case 0: return "Ciel clair";
    case 1: return "Principalement clair";
    case 2: return "Partiellement nuageux";
    case 3: return "Couvert";
    case 45: return "Brouillard";
    case 48: return "Brouillard givrant";
    case 51: return "Bruine légère";
    case 53: return "Bruine modérée";
    case 55: return "Bruine dense";
    case 61: return "Pluie faible";
    case 63: return "Pluie modérée";
    case 65: return "Pluie forte";
    case 71: return "Neige faible";
    case 73: return "Neige modérée";
    case 75: return "Neige forte";
    case 80: return "Averses faibles";
    case 81: return "Averses modérées";
    case 82: return "Averses fortes";
    case 95: return "Orage";
    case 96: return "Orage avec grêle faible";
    case 99: return "Orage avec grêle forte";
    default: return "Code météo inconnu";
  }
}

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Appel météo quand une ville est sélectionnée
  const handleCitySelect = async (city: City) => {
    setSelectedCity(city);
    setWeather(null);
    setError(null);
    try {
      const response = await axios.get<WeatherApiResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
      );
      const data = response.data.current_weather;
      if (data) {
        setWeather({
          temperature: data.temperature,
          windspeed: data.windspeed,
          weathercode: data.weathercode,
        });
      } else {
        setError("Aucune donnée météo trouvée.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération de la météo.");
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="search-container">
        <CitySearch onCitySelect={handleCitySelect} />
      </div>
      {selectedCity && (
        <div>
          <h2>Ville sélectionnée :</h2>
          <p>
            {selectedCity.name}, {selectedCity.country} <br />
            Latitude: {selectedCity.latitude}, Longitude: {selectedCity.longitude}
          </p>
        </div>
      )}
      {weather && (
        <div>
          <h2>Météo actuelle</h2>
          <p>Température : {weather.temperature}°C</p>
          <p>Vent : {weather.windspeed} km/h</p>
          <p>Code météo : {weather.weathercode}</p>
          <p>Description : {getWeatherDescription(weather.weathercode)}</p>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default App;