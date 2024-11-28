import { useDocumentTitle } from '../hooks/index.js';

// ------------------------------------------
const HomePage = () => {
  useDocumentTitle('Inicio');

  return (
    <>
      <p className='font-poppins'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam soluta
        suscipit saepe harum hic quam cupiditate corrupti dolorem officiis,
        rerum minima ratione voluptatum illo aspernatur nemo excepturi
        reprehenderit? Quos, nemo.
      </p>
      <h1 className='font-poppins text-2xl'>Texto con Poppins</h1>
      <span className='font-montserrat'>Datos con Montserrat</span>
      <p className='font-normal'>
        Este texto usa el peso 400 (normal) de Inter.
      </p>
      <p className='font-medium'>
        Este texto usa el peso 500 (medio) de Inter.
      </p>
    </>
  );
};

export default HomePage;
