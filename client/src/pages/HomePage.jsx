import { useDocumentTitle } from '../hooks/index.js';

// ------------------------------------------
const HomePage = () => {
  useDocumentTitle('Inicio');

  return <p>test</p>;
};

export default HomePage;
