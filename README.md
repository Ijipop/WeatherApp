# 🌤️ Weather App

Une application météo moderne et élégante développée avec React, TypeScript et Vite. Interface utilisateur avec design glassmorphism et animations fluides.

## ✨ Fonctionnalités

- **🔍 Recherche de villes** en temps réel avec autocomplétion
- **📍 Géolocalisation** automatique des villes via API Open-Meteo
- **🌡️ Données météo** en temps réel : température, vent, conditions météorologiques
- **🎨 Interface moderne** avec design glassmorphism et dégradés
- **📱 Responsive design** adapté mobile, tablette et desktop
- **⚡ Animations fluides** et transitions élégantes
- **🎯 Icônes météo** dynamiques selon les conditions
- **🛡️ Gestion d'erreurs** complète avec messages utilisateur

## 🛠️ Technologies utilisées

- **React 19.1.0** - Framework JavaScript moderne
- **TypeScript** - Typage statique pour une meilleure robustesse
- **Vite** - Outil de build rapide et moderne
- **Axios** - Client HTTP pour les appels API
- **CSS3** - Design glassmorphism avec variables CSS et animations
- **Open-Meteo API** - API météo gratuite et fiable 

## 📋 Prérequis

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**
- **Navigateur web moderne** (Chrome, Firefox, Safari, Edge)

## 🚀 Installation et lancement

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

### 4. Build pour la production
```bash
npm run build
```



## 🧪 Tests des fonctionnalités

### Test de recherche
1. **Recherche normale** : Tapez le nom d'une ville (ex: "Paris", "Montreal")
2. **Autocomplétion** : Sélectionnez une ville dans la liste déroulante
3. **Affichage météo** : Vérifiez l'affichage des données météo avec icônes

### Test de gestion d'erreurs
1. **Erreur réseau** : Déconnectez votre internet et essayez de rechercher
2. **Ville inexistante** : Recherchez une ville avec un nom très rare
3. **Recherche courte** : Tapez moins de 2 caractères

### Test de l'interface
1. **Responsive** : Testez sur différentes tailles d'écran
2. **Animations** : Observez les transitions et effets visuels
3. **Glassmorphism** : Vérifiez l'effet de transparence et flou

## 🎨 Caractéristiques du design

- **Dégradé de fond** : Violet-bleu avec effet de particules flottantes
- **Cartes glassmorphism** : Transparence avec effet de flou (backdrop-filter)
- **Animations CSS** : Transitions fluides et animations d'entrée
- **Icônes météo** : Emojis dynamiques selon les conditions (☀️, 🌧️, ⛈️, etc.)
- **Typographie moderne** : Police Inter avec hiérarchie visuelle claire

## 📱 Compatibilité

- ✅ **Desktop** : Chrome, Firefox, Safari, Edge
- ✅ **Mobile** : iOS Safari, Chrome Mobile, Samsung Internet
- ✅ **Tablette** : iPad, Android tablets

## 👨‍💻 Auteur

Développé par **Jean-François Lefebvre** pour un Lab du cours de Service Web.

---
