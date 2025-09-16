import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


//Importe les modules nécessaires :

//StrictMode de React : un outil de développement qui aide à repérer les problèmes potentiels.

//createRoot de react-dom/client : la méthode moderne (React 18+) pour démarrer l'app.

//index.css : les styles globaux de l'application.

//App : le composant racine de l'application.

//Cible l’élément HTML avec l’ID root, généralement défini dans index.html.

//Crée un "root" React avec createRoot(...).

//Rend l'application React en injectant <App /> dans cet élément #root, enveloppé dans <StrictMode> 
// pour activer les vérifications de React en développement (comme les appels doublés ou les méthodes obsolètes).

