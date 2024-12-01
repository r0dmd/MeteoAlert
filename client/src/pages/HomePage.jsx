import { useContext } from 'react';

import { AuthContext } from '../contexts/index.js';

import { useDocumentTitle } from '../hooks/index.js';

// React icons
import { RxAvatar } from 'react-icons/rx';

const { VITE_API_UPLOADS } = import.meta.env;

// ------------------------------------------
const HomePage = () => {
  useDocumentTitle('Inicio');

  const authContext = useContext(AuthContext);
  const { authUser } = authContext;

  console.log(authUser);

  return (
    <div>
      {/* Bienvenida */}
      {authUser ? (
        <div>
          <img
            src={
              VITE_API_UPLOADS + '/' + authUser.user.avatar ||
              VITE_API_UPLOADS + '/default-avatar.png'
            }
            alt="Avatar del usuario"
            className="ml-3 h-16 w-16 rounded-full"
          />
          <p className="text-shadow-md mx-auto my-8 w-4/5 rounded border border-whitegray p-3 text-center font-poppins text-3xl font-semibold shadow-md">
            {`Hola, ${authUser.user.username}`}
          </p>
        </div>
      ) : (
        <p className="text-shadow-md mx-auto my-8 w-4/5 rounded border border-whitegray p-3 text-center font-poppins text-3xl font-semibold shadow-md">
          Tu portal de alertas meteorológicas
        </p>
      )}

      <div className="bg-darkgray p-3 text-whitegray">
        <p className="my-2">
          Con{' '}
          <span className="italic underline decoration-sunnyyellow decoration-2 underline-offset-4">
            MeteoAlert
          </span>
          , puedes:
        </p>
        <ul>
          <li className="my-2 ml-5">
            ✅ Recibir alertas{' '}
            <span className="text-sunnyyellow">en tiempo real</span> basadas en
            tu ubicación.
          </li>
          <li className="my-2 ml-5">
            ✅ <span className="text-sunnyyellow">Personalizar</span> los tipos
            de alertas que te interesan.
          </li>
          <li className="my-2 ml-5">
            ✅ Acceder a información meteorológica{' '}
            <span className="text-sunnyyellow">confiable</span>, gracias a{' '}
            <a
              title="Enlace a Open-Meteo"
              href="https://open-meteo.com/"
              className="font-bold italic"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-Meteo
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
