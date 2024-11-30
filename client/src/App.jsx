// Hooks
import { Routes, Route } from 'react-router-dom';

// Páginas
import {
  HomePage,
  AboutPage,
  AlertsPage,
  AllUsersPage,
  LocationsPage,
  LoginPage,
  NotFoundPage,
  PreferencesPage,
  PrivacyPolicyPage,
  ProfilePage,
  RegisterPage,
} from './pages/index.js';

// Componentes
import { Header, Footer } from './components';
import { ParticlesBackground } from './components/aux_components/index.js';

// Otras funciones
import { Toaster } from 'react-hot-toast';

// ------------------------------------------
// Componente principal de la aplicación, actúa como base de la estructura visual. También configura elementos globales como notificaciones, contextos compartidos, y el enrutamiento principal
const App = () => {
  return (
    <section className='flex flex-col min-h-screen'>
      <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
      <Header />
      <ParticlesBackground />

      <section className='flex-grow'>
        <Routes>
          {/* USUARIOS */}
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/users' element={<AllUsersPage />} />

          {/* UBICACIONES */}
          <Route path='/locations' element={<LocationsPage />} />

          {/* PREFRENCIAS */}
          <Route path='/preferences' element={<PreferencesPage />} />

          {/* ALERTAS */}
          <Route path='/alerts' element={<AlertsPage />} />

          {/* OTROS */}
          <Route path='/about' element={<AboutPage />} />
          <Route path='/privacy' element={<PrivacyPolicyPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </section>
      <Footer />
    </section>
  );
};

export default App;
