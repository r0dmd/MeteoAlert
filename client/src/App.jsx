// Hooks
import { Routes, Route } from 'react-router-dom';

// Páginas

// Componentes
import { Header, Footer } from './components';

// Otras funciones
import { Toaster } from 'react-hot-toast';

// ------------------------------------------
// Componente principal de la aplicación, actúa como base de la estructura visual. También configura elementos globales como notificaciones, contextos compartidos, y el enrutamiento principal
const App = () => {
  return (
    <section>
      <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
      <Header />
      <Footer />
    </section>
  );
};

export default App;
