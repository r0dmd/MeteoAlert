import { useDocumentTitle } from '../hooks/index.js';

const HomePage = () => {
  useDocumentTitle('Inicio');

  return (
    <div className="container-main">
      {/* Bienvenida */}
      <p className="welcome-text">Tu portal de alertas meteorológicas</p>

      <div className="alert-container">
        <p className="description-text">
          Con{' '}
          <span className="italic underline decoration-sunnyyellow decoration-2 underline-offset-4">
            MeteoAlert
          </span>
          , puedes:
        </p>
        <ul className="list-inside">
          <li className="list-text">
            ✅ Recibir alertas{' '}
            <span className="text-sunnyyellow">en tiempo real</span> basadas en
            tu ubicación.
          </li>
          <li className="list-text">
            ✅ <span className="text-sunnyyellow">Personalizar</span> los tipos
            de alertas que te interesan.
          </li>
          <li className="list-text">
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
