import { useDocumentTitle, useGoHome } from '../hooks/index.js';

// ------------------------------------------
const NotFoundPage = () => {
  useDocumentTitle('¡Ups!');
  const goHome = useGoHome();

  return <button onClick={goHome}>Regresar a Inicio</button>;
};

export default NotFoundPage;
