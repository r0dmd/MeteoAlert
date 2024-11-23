import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css';
import App from './App.jsx';

// ------------------------------------------
// Punto de entrada principal de la aplicación. Se encarga de montar el árbol de componentes de React en el DOM. Incluye configuraciones globales como el modo estricto de React y enlaza el componente principal `App` al elemento raíz del HTML

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
