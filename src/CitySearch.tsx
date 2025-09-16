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

  const handleCityClick = (city: City) => {
    onCitySelect(city);
    setQuery(city.name);
    setResults([]);
    setError(null);
    setNoResults(false);
    setShortQuery(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher une ville..."
        value={query}
        onChange={handleChange}
      />
      {loading && <div className="status-message loading">🔍 Recherche en cours...</div>}
      {error && <div className="status-message error">{error}</div>}
      {shortQuery && !loading && !error && (
        <div className="status-message warning">
          💡 Tapez au moins 2 caractères pour rechercher une ville.
        </div>
      )}
      {noResults && !loading && !error && (
        <div className="status-message warning">
          🔍 Aucune ville trouvée avec le nom "{query}". Essayez avec un autre nom.
        </div>
      )}
      {results.length > 0 && (
        <ul>
          {results.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleCityClick(city)}
            >
              📍 {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;


/*
⚙️ État local géré avec useState :
query : le texte tapé par l’utilisateur

results : liste de villes obtenues via l’API

loading : booléen pour indiquer si une requête est en cours

error : message d’erreur si la requête échoue

noResults : booléen qui indique si aucun résultat n’a été trouvé

shortQuery : booléen si l’utilisateur tape moins de 2 caractères (pour éviter les requêtes inutiles)

🔁 Fonction handleChange(e)
Déclenchée à chaque frappe dans l’input :

Met à jour query avec la nouvelle valeur

Réinitialise les erreurs et les drapeaux (error, noResults, shortQuery)

Si la saisie fait moins de 2 caractères → n’effectue pas de requête

Sinon → lance un appel axios à l’API de géocodage

Si des résultats sont trouvés :

Les stocke dans results (avec name, country, latitude, longitude)

Si aucun résultat :

Affiche un message “Aucune ville trouvée”

En cas d’erreur réseau :

Affiche un message d’erreur en rouge

🖼️ Interface affichée (return)
Champ texte <input> pour rechercher une ville

Messages dynamiques :

“Chargement...” si loading

Message d’erreur si error

Message vert si shortQuery

Message orange si noResults

Liste <ul> de résultats (chaque ville affichée comme <li>)

Chaque <li> est cliquable et appelle onCitySelect(city) pour envoyer la ville sélectionnée au parent (App.tsx)

✅ Résumé express :
CitySearch.tsx est un composant autonome de recherche de ville qui :

Fait un appel à l’API Open-Meteo pour géocoder un nom de ville

Gère les états intermédiaires (chargement, erreur, trop court, aucun résultat)

Affiche une liste cliquable de résultats

Communique la ville choisie au parent avec onCitySelect


*/