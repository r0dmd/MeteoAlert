// Utilidad base para hacer fetch
import { apiFetch } from './index.js';

// ------------------------------------------
// Funciones de servicio relacionadas con la autenticación.
// ------------------------------------------

// Función para registrar un nuevo usuario.
export const registerUser = async (userData) => {
  return apiFetch('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Función para iniciar sesión.
export const loginUser = async (credentials) => {
  return apiFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// Función para actualizar el perfil de usuario (sin avatar).
export const updateUser = async (authToken, userProfile) => {
  return apiFetch('/users/profile/update', {
    method: 'PUT',
    authToken,
    body: JSON.stringify(userProfile),
  });
};

// Función para actualizar el avatar del usuario.
export const updateUserWithAvatar = async (authToken, userProfile) => {
  const formData = new FormData();
  Object.entries(userProfile).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return apiFetch('/users/profile/update', {
    method: 'PUT',
    authToken,
    headers: {}, // NOTA: Eliminar el header Content-Type para permitir multipart/form-data
    body: formData,
  });
};

// Función para actualizar la contraseña.
export const updatePassword = async (authToken, oldPass, newPass) => {
  return apiFetch('/users/profile/update/password', {
    method: 'PUT',
    authToken,
    body: JSON.stringify({ oldPass, newPass }),
  });
};
