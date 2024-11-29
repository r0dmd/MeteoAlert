const { VITE_APP_NAME } = import.meta.env;

const Header = () => {
  return (
    <header className='h-16 px-6 flex justify-between items-center mx-auto bg-darkgray border-b-sunnyyellow border-b-8'>
      {/* LOGO */}
      <img
        src='/logo/logo-small.png'
        alt={`Logo de ${VITE_APP_NAME}.`}
        className='h-12'
      />
      <h1>MeteoAlert</h1>
    </header>
  );
};

export default Header;
