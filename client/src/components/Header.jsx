import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

// React icons
import { AuthContext } from '../contexts/index.js';
import { AiOutlineAlert } from 'react-icons/ai';
import { IoMenuOutline } from 'react-icons/io5';

const { VITE_APP_NAME, VITE_API_UPLOADS } = import.meta.env;

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
        {/* Posicionamiento */}
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
                  className="login-logout-buttons"
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
                  className="header-icons"
                >
                  <AiOutlineAlert />
                </button>

                {/* Botón de menú */}
                <button
                  onClick={() => setIsMenuModalOpen(true)}
                  title="Menú"
                  aria-label="Menú"
                  className="header-icons relative"
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
          className="fixed inset-0 z-50 bg-nightblue bg-opacity-50"
        >
          {/* Posicionamiento */}
          <div className="mx-auto flex w-full max-w-6xl justify-end px-6 py-12">
            {/* Recuadro */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex w-fit flex-col items-center rounded border-4 border-b-warmyellow border-l-sunnyyellow border-r-warmyellow border-t-sunnyyellow bg-nightblue p-6 shadow-lg"
            >
              {/* Avatar */}
              <img
                src={
                  VITE_API_UPLOADS + '/' + authUser.avatar ||
                  VITE_API_UPLOADS + '/default-avatar.png'
                }
                alt="Avatar del usuario"
                className="avatar"
              />

              <ul className="flex flex-col items-end gap-4 text-sm text-whitegray">
                {/* Botones */}
                {isAdmin && (
                  <li>
                    <NavLink to="/users">
                      <button
                        title="Administración"
                        aria-label="Administración"
                        onClick={() => setIsMenuModalOpen(false)}
                        className="header-buttons"
                      >
                        Administración
                      </button>
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink to="/profile">
                    <button
                      title="Mi perfil"
                      aria-label="Mi perfil"
                      onClick={() => setIsMenuModalOpen(false)}
                      className="header-buttons"
                    >
                      Mi perfil
                    </button>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/locations">
                    <button
                      title="Mis ubicaciones"
                      aria-label="Mis ubicaciones"
                      onClick={() => setIsMenuModalOpen(false)}
                      className="header-buttons"
                    >
                      Mis ubicaciones
                    </button>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/preferences">
                    <button
                      title="Mis preferencias"
                      aria-label="Mis preferencias"
                      onClick={() => setIsMenuModalOpen(false)}
                      className="header-buttons"
                    >
                      Mis preferencias
                    </button>
                  </NavLink>
                </li>

                <li>
                  <button
                    title="Cerrar sesión"
                    aria-label="Cerrar sesión"
                    onClick={() => {
                      setIsMenuModalOpen(false);
                      authLogoutState();
                    }}
                    className="login-logout-buttons"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
