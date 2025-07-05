# Weather App

Une application météo développée avec React, TypeScript et Vite qui permet de rechercher des villes et d'afficher les conditions météorologiques actuelles.

##  Fonctionnalités

-  **Recherche de villes** en temps réel
-  **Géolocalisation** automatique des villes
-  **Données météo** en temps réel de température, vent, conditions météorolique
-  **Gestion d'erreurs**

##  Technologies utilisées

- **React 19.1.0** 
- **TypeScript** 
- **Axios** 
- **Open-Meteo API** 

##  Prérequis

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**

## Installation et lancement

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd WeatherApp
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer l'application en mode développement
```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`



## Tests des fonctionnalités

### Test de recherche
1. Tapez le nom d'une ville dans le champ de recherche
2. Sélectionnez une ville dans la liste déroulante
3. Vérifiez l'affichage des données météo

### Test de gestion d'erreurs
1. **Erreur réseau** : Déconnectez votre internet et essayez de rechercher
2. **Ville inexistante** : Recherchez une ville avec un nom très rare
3. **Recherche courte** : Tapez moins de 2 caractères


## Auteur

Développé par Jean-François Lefebvre pour un Lab du cours de Service Web.

---
