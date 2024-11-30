import { NavLink } from 'react-router-dom';

import { AuthContext } from '../contexts/index.js';

const { VITE_APP_NAME } = import.meta.env;

// React icons
import { AiOutlineAlert } from 'react-icons/ai';
import { IoMenuOutline } from 'react-icons/io5';
import { useContext } from 'react';

// ------------------------------------------
const Header = () => {
  const authContext = useContext(AuthContext);
  const { authUser, isAdmin, authLogoutState } = authContext;

  return (
    <header className="h-16 border-b-8 border-b-sunnyyellow bg-darkgray">
      <div className="mx-auto flex h-full max-w-6xl items-center px-6">
        {/* LOGO */}
        <NavLink to="/">
          <img
            title="Ir a inicio"
            src="/logo/logo-small.png"
            alt={`Logo de ${VITE_APP_NAME}.`}
            className="h-12"
          />
        </NavLink>

        <h1 className="px-2 font-poppins text-2xl text-whitegray">
          MeteoAlert
        </h1>

        {/* Separador */}
        <div className="flex-grow"></div>

        {/* BOTONES */}
        <nav className="flex gap-x-5">
          {authUser && (
            <>
              <button
                title="Mis notificaciones"
                aria-label="Mis notificaciones de alertas"
                className="rounded border-2 border-sunnyyellow text-3xl text-sunnyyellow hover:text-whitegray"
              >
                <AiOutlineAlert />
              </button>

              <button
                title="Menú"
                aria-label="Menú"
                className="rounded border-2 border-sunnyyellow text-3xl text-sunnyyellow hover:text-whitegray"
              >
                <IoMenuOutline />
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
