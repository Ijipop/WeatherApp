import React, { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";

type City = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};
// Props pour la fonction CitySearch
type Props = {
  onCitySelect: (city: City) => void;
};

  const CitySearch: React.FC<Props> = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  const [shortQuery, setShortQuery] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setError(null);
    setNoResults(false);
    setShortQuery(false);

    if (value.length < 2) {
      setResults([]);
      if (value.length > 0) {
        setShortQuery(true);
      }
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=fr&format=json`
      );
      
      const cities = (response.data as any).results?.map((city: any) => ({
        name: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      })) || [];
      
      setResults(cities);
      
      // Vérifier si aucune ville n'a été trouvée
      if (cities.length === 0 && value.length >= 2) {
        setNoResults(true);
      }
      
      
    } catch (err) {
      console.error("Erreur de recherche:", err);
      setError("Erreur lors de la recherche de villes. Vérifiez votre connexion internet.");
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher une ville..."
        value={query}
        onChange={handleChange}
      />
      {loading && <div>Chargement...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {shortQuery && !loading && !error && (
        <div style={{ color: "green" }}>
          Tapez au moins 2 caractères pour rechercher une ville.
        </div>
      )}
      {noResults && !loading && !error && (
        <div style={{ color: "orange" }}>
          Aucune ville trouvée avec le nom "{query}". Essayez avec un autre nom.
        </div>
      )}
      <ul>
        {results.map((city, idx) => (
          <li
            key={idx}
            style={{ cursor: "pointer" }}
            onClick={() => onCitySelect(city)}
          >
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;