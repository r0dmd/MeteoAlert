// Importamos las dependencias necesarias.
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos contexto.
import { AuthContext } from './index.js';

// Función de modelo para las llamadas a la API.
import { apiFetch } from '../api/index.js';

const { VITE_AUTH_TOKEN } = import.meta.env;

// ------------------------------------------
// Componente AuthProvider, enfocado únicamente en manejar el estado compartido, como authUser y authToken.
const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(VITE_AUTH_TOKEN) || null,
  );
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  // Obtiene el usuario autenticado si hay un token.
  useEffect(() => {
    const fetchUser = async () => {
      if (!authToken || authUser) return;

      try {
        setAuthLoading(true);
        const { user } = await apiFetch('/users/profile', { authToken });
        setAuthUser(user);
      } catch (err) {
        console.error(err.message);
        setAuthToken(null);
        localStorage.removeItem(VITE_AUTH_TOKEN);
        setAuthUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    if (authToken) fetchUser();
    else setAuthUser(null);
  }, [authToken, authUser]);

  // Función que guarda el token y lo almacena en localStorage.
  const authLoginState = (token) => {
    setAuthToken(token);
    localStorage.setItem(VITE_AUTH_TOKEN, token);
  };

  // Función que elimina el token y redirige al inicio.
  const authLogoutState = () => {
    setAuthToken(null);
    localStorage.removeItem(VITE_AUTH_TOKEN);
    navigate('/');
  };

  // Función para actualizar los datos del usuario en el estado.
  const authUpdateUserState = (username, email, role, avatar) => {
    setAuthUser((prevAuthUser) => ({
      ...prevAuthUser,
      username,
      email,
      role,
      avatar,
    }));
  };

  // Helpers para roles (NOTA: Si son exclusivos del contexto, se mantienen aquí para mantener la simplicidad. Si se reutilizan fuera del contexto, se pueden mover a un módulo independiente como src/helpers/authHelpers.js, que favorece la modularidad y el reuso.)
  const hasRole = (role) => authUser?.role === role;
  const isAdmin = () => hasRole('admin');
  const isNormal = () => hasRole('normal');

  return (
    <AuthContext.Provider
      value={{
        authToken,
        authUser,
        authLoading,
        authLoginState,
        authLogoutState,
        authUpdateUserState,
        isAdmin,
        isNormal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Validación de props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
