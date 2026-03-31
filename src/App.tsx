import { useState } from "react";
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

// Fonction pour obtenir l'icône météo en fonction du code météo
function getWeatherIcon(code: number): string {
  switch (code) {
    case 0: return "☀️";
    case 1: return "🌤️";
    case 2: return "⛅";
    case 3: return "☁️";
    case 45: return "🌫️";
    case 48: return "🌫️";
    case 51: return "🌦️";
    case 53: return "🌦️";
    case 55: return "🌦️";
    case 61: return "🌧️";
    case 63: return "🌧️";
    case 65: return "🌧️";
    case 71: return "🌨️";
    case 73: return "🌨️";
    case 75: return "🌨️";
    case 80: return "🌦️";
    case 81: return "🌦️";
    case 82: return "🌦️";
    case 95: return "⛈️";
    case 96: return "⛈️";
    case 99: return "⛈️";
    default: return "❓";
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

  let headerIcon: string;
  let headerLabel: string;
  if (weather) {
    headerIcon = getWeatherIcon(weather.weathercode);
    headerLabel = getWeatherDescription(weather.weathercode);
  } else if (error && selectedCity) {
    headerIcon = "⚠️";
    headerLabel = error;
  } else if (selectedCity) {
    headerIcon = "⏳";
    headerLabel = "Chargement de la météo…";
  } else {
    headerIcon = "🌤️";
    headerLabel = "Choisis une ville pour voir la météo";
  }

  const headerLogoLoading = Boolean(selectedCity && !weather && !error);

  return (
    <div className="app-container">
      <header className="app-header">
        <span
          className={`app-title-logo${headerLogoLoading ? " app-title-logo--loading" : ""}`}
          title={headerLabel}
          role="img"
          aria-label={headerLabel}
        >
          {headerIcon}
        </span>
        <h1>Weather App</h1>
      </header>
      <div className="search-container">
        <CitySearch onCitySelect={handleCitySelect} />
      </div>
      {selectedCity && (
        <div className="info-card">
          <h2>
            <span className="weather-icon">📍</span>
            Ville sélectionnée
          </h2>
          <p><strong>{selectedCity.name}, {selectedCity.country}</strong></p>
          <p>Latitude: {selectedCity.latitude.toFixed(4)}°</p>
          <p>Longitude: {selectedCity.longitude.toFixed(4)}°</p>
        </div>
      )}
      {weather && (
        <div className="info-card">
          <h2>
            <span className="weather-icon">{getWeatherIcon(weather.weathercode)}</span>
            Météo actuelle
          </h2>
          <p><strong>Température :</strong> {weather.temperature}°C</p>
          <p><strong>Vent :</strong> {weather.windspeed} km/h</p>
          <p><strong>Conditions :</strong> {getWeatherDescription(weather.weathercode)}</p>
        </div>
      )}
      {error && <div className="status-message error">{error}</div>}
    </div>
  );
}

export default App;

/*
 État géré avec useState :
selectedCity : la ville choisie par l’utilisateur (ou null par défaut)

weather : les données météo reçues depuis l’API (ou null)

error : message d’erreur à afficher en cas de problème (ou null)

🌐 Fonction handleCitySelect(city)
Déclenchée quand une ville est sélectionnée via le composant CitySearch :

Enregistre la ville dans selectedCity

Vide weather et error pour recommencer proprement

Appelle l’API open-meteo.com avec les coordonnées de la ville

Si la réponse contient des données météo :

Met à jour l’état weather avec la température, le vent et le code météo

Sinon ou en cas d’erreur :

Affiche un message d’erreur dans error

🔍 Fonction getWeatherDescription(code)
Transforme un code météo brut (ex. : 0, 63, 95) en description humaine :

0 → "Ciel clair"

63 → "Pluie modérée"

95 → "Orage"

…etc. (switch complet intégré)

🧩 Interface rendue (return)
Titre principal : Weather App

Composant enfant <CitySearch onCitySelect={handleCitySelect} /> pour chercher une ville

Si une ville est sélectionnée :

Affiche son nom, pays, latitude et longitude

Si la météo est disponible :

Affiche température, vent, code météo et sa description lisible

Si une erreur est présente :

Affiche un message en rouge

✅ Résumé rapide :
App.tsx est le composant central de l’application météo :

Gère les données et les erreurs avec useState

Appelle l’API météo à la sélection d’une ville

Affiche dynamiquement l’interface selon l’état (ville choisie, météo dispo, erreur)

Utilise une fonction utilitaire pour traduire les codes météo en français
*/