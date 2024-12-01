import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

// React icons
import { AuthContext } from '../contexts/index.js';
import { AiOutlineAlert } from 'react-icons/ai';
import { IoMenuOutline } from 'react-icons/io5';

const { VITE_APP_NAME } = import.meta.env;

// ------------------------------------------
const Header = () => {
  const authContext = useContext(AuthContext);
  const { authUser, isAdmin, authLogoutState } = authContext;

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="h-16 border-b-8 border-b-sunnyyellow bg-darkgray">
        <div className="mx-auto flex h-full max-w-6xl items-center px-6">
          {/* LOGO */}
          <NavLink to="/" title="Ir a inicio">
            <img
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
            {!authUser && (
              <NavLink to="/login">
                <button
                  title="Iniciar sesión"
                  aria-label="Iniciar sesión"
                  className="rounded-full border-2 border-sunnyyellow px-2 py-1 text-sm font-semibold text-sunnyyellow hover:bg-sunnyyellow hover:text-darkgray"
                >
                  Iniciar sesión
                </button>
              </NavLink>
            )}

            {authUser && (
              <>
                {/* Botón de notificaciones */}
                <button
                  onClick={() => setIsAlertModalOpen(true)}
                  title="Mis notificaciones"
                  aria-label="Mis notificaciones de alerta"
                  className="rounded border-2 border-sunnyyellow text-3xl text-sunnyyellow hover:text-whitegray"
                >
                  <AiOutlineAlert />
                </button>

                {/* Botón de menú */}
                <button
                  onClick={() => setIsMenuModalOpen(true)}
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

      {/* Modales */}
      {/* Modal de Alertas */}
      {isAlertModalOpen && (
        <div
          onClick={() => setIsAlertModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-nightblue bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-11/12 max-w-md rounded p-6 shadow-lg"
          >
            <h2 className="text-lg font-bold text-darkgray">
              Mis Notificaciones
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Aquí aparecerán tus notificaciones de alerta.
            </p>
            <button
              onClick={() => setIsAlertModalOpen(false)}
              className="hover:bg-yellow-500 mt-4 rounded bg-sunnyyellow px-4 py-2 text-sm font-semibold text-darkgray"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Menú */}
      {isMenuModalOpen && (
        /* Fondo */
        <div
          onClick={() => setIsMenuModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-nightblue bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-7 top-10 w-fit rounded border-4 border-b-warmyellow border-l-sunnyyellow border-r-warmyellow border-t-sunnyyellow bg-nightblue p-6 shadow-lg"
          >
            <ul className="mt-2 text-sm text-whitegray">
              <li>
                <NavLink
                  to="/profile"
                  onClick={() => setIsMenuModalOpen(false)}
                >
                  Perfil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  onClick={() => setIsMenuModalOpen(false)}
                >
                  Configuración
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" onClick={() => setIsMenuModalOpen(false)}>
                  Ayuda
                </NavLink>
              </li>
            </ul>

            <button
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
              onClick={() => {
                setIsMenuModalOpen(false);
                authLogoutState();
              }}
              className="rounded-full border-2 border-sunnyyellow px-2 py-1 text-sm font-semibold text-sunnyyellow hover:bg-sunnyyellow hover:text-darkgray"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
