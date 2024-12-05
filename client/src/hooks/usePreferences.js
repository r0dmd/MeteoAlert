import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../contexts/index.js';
import { apiFetch } from '../api/index.js';
import toast from 'react-hot-toast';

// ------------------------------------------
const usePreferences = () => {
  const { authToken } = useContext(AuthContext);

  const [preferences, setPreferences] = useState([]);
  const [preferencesLoading, setPreferencesLoading] = useState(false);

  // ------------------------------------------
  // Obtener todas las preferencias meteorológicas
  const getPreferences = useCallback(async () => {
    try {
      setPreferencesLoading(true);

      const data = await apiFetch('/preferences', {
        authToken,
        method: 'GET',
      });
      console.log(data);

      setPreferences(data);
      return data;
    } catch (err) {
      console.error('Error al obtener preferencias:', err);
      throw err;
    } finally {
      setPreferencesLoading(false);
    }
  }, [authToken]);

  // ------------------------------------------
  // Añadir nueva preferencia
  const addPreference = useCallback(
    async (preferenceData) => {
      try {
        setPreferencesLoading(true);

        // Enviar la nueva preferencia al backend
        await apiFetch(`/preferences/new`, {
          authToken,
          method: 'POST',
          body: JSON.stringify(preferenceData),
        });

        // Actualizar el estado añadiendo la nueva preferencia
        setPreferences((prevPreferences) => ({
          ...prevPreferences,
          preferences: [...prevPreferences.preferences, preferenceData], // NOTA: Ponemos directamente preferenceData porque ya está disponible, y no se necesita obtenerla del back-end
        }));
      } catch (err) {
        toast.error(err.message);
        throw err;
      } finally {
        setPreferencesLoading(false);
      }
    },
    [authToken],
  );

  // ------------------------------------------
  // Actualizar preferencia
  const updatePreference = useCallback(
    async (preferenceId, preferenceData) => {
      try {
        setPreferencesLoading(true);

        // Enviar la preferencia actualizada al backend
        await apiFetch(`/preferences/${preferenceId}`, {
          authToken,
          method: 'PUT',
          body: JSON.stringify(preferenceData),
        });

        // Actualizar el estado reemplazando la preferencia existente con la actualizada
        setPreferences((prevPreferences) => ({
          ...prevPreferences,
          preferences: prevPreferences.preferences.map(
            (preference) =>
              preference.id === preferenceId
                ? { ...preference, ...preferenceData } // Actualizar la preferencia coincidente
                : preference, // Mantener las demás preferencias intactas
          ),
        }));
      } catch (err) {
        toast.error(err.message);
        throw err;
      } finally {
        setPreferencesLoading(false);
      }
    },
    [authToken],
  );

  // ------------------------------------------
  // Eliminar una preferencia por su ID
  const deletePreference = useCallback(
    async (preferenceId) => {
      try {
        setPreferencesLoading(true);

        await apiFetch(`/preferences/${preferenceId}/delete`, {
          authToken,
          method: 'DELETE',
        });

        // Actualizar el estado eliminando la preferencia borrada
        setPreferences((prevPreferences) =>
          prevPreferences.preferences.filter(
            (preference) => preference.id !== preferenceId,
          ),
        );
      } catch (err) {
        toast.error(err.message);
        throw err;
      } finally {
        setPreferencesLoading(false);
      }
    },
    [authToken],
  );

  // ------------------------------------------
  return {
    preferences,
    preferencesLoading,
    getPreferences,
    addPreference,
    updatePreference,
    deletePreference,
  };
};

export default usePreferences;
