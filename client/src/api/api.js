// Importamos las variables de entorno para obtener la URL base de la API.
const baseUrl = import.meta.env.VITE_API_URL;

/**
 * Función base para realizar solicitudes HTTP a la API.
 * @param {string} endpoint - Ruta relativa del endpoint (e.g., "/users/login").
 * @param {object} options - Opciones para la solicitud (headers, método, body, etc.).
 * @returns {Promise<any>} - Respuesta JSON del servidor.
 */
const apiFetch = async (endpoint, { authToken, ...options } = {}) => {
  // Definimos las cabeceras por defecto.
  const defaultHeaders = {
    Authorization: authToken || '', // Incluimos el token si existe.
    'Content-Type': 'application/json', // Formato por defecto para el body.
  };

  try {
    // Realizamos la solicitud combinando las opciones del usuario y las cabeceras por defecto.
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });

    // Convertimos la respuesta a JSON.
    const body = await res.json();

    // Si la respuesta indica error, lanzamos una excepción.
    if (body.status === 'error') {
      throw new Error(body.message);
    }

    // Si la respuesta es exitosa, retornamos los datos.
    return body.data;
  } catch (err) {
    // Mostramos el error en consola para facilitar la depuración.
    console.error(`Error en apiFetch (${endpoint}): ${err.message}`);
    throw err; // Relanzamos el error para manejarlo donde se use la función.
  }
};

export default apiFetch;
