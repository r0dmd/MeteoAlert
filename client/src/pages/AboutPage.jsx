import { useDocumentTitle } from '../hooks/index.js';

// ------------------------------------------
const AboutPage = () => {
  useDocumentTitle('Acerca de');

  return <p>about</p>;
};

export default AboutPage;
