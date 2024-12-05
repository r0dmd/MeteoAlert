import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../contexts/index.js';
import { apiFetch } from '../api/index.js';
import toast from 'react-hot-toast';

const useLocations = () => {
  const { authToken } = useContext(AuthContext);

  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);

  // ------------------------------------------
  // Obtener todas las ubicaciones de un usuario
  const getLocations = useCallback(async () => {
    try {
      setLocationsLoading(true);

      const data = await apiFetch('/locations', {
        authToken,
        method: 'GET',
      });
      console.log(data);

      setLocations(data);
      return data;
    } catch (err) {
      console.error('Error al obtener ubicaciones:', err);
      throw err;
    } finally {
      setLocationsLoading(false);
    }
  }, [authToken]);

  // ------------------------------------------
  // Añadir nueva ubicación
  const addLocation = useCallback(
    async (locationData) => {
      try {
        setLocationsLoading(true);

        // Enviar la nueva ubicación al backend
        await apiFetch(`/locations/new`, {
          authToken,
          method: 'POST',
          body: JSON.stringify(locationData),
        });

        // Actualizar el estado añadiendo la nueva ubicación
        setLocations((prevLocations) => [
          ...prevLocations.locations,
          locationData,
        ]);
      } catch (err) {
        toast.error(err.message);
        throw err;
      } finally {
        setLocationsLoading(false);
      }
    },
    [authToken],
  );

  // ------------------------------------------
  // Actualizar ubicación
  const updateLocation = useCallback(
    async (locationId, locationData) => {
      try {
        setLocationsLoading(true);

        // Enviar la ubicación actualizada al backend
        await apiFetch(`/locations/${locationId}/update`, {
          authToken,
          method: 'PUT',
          body: JSON.stringify(locationData),
        });

        // Actualizar el estado reemplazando la ubicación existente con la actualizada
        setLocations((prevLocations) =>
          prevLocations.locations.map(
            (location) =>
              location.id === locationId
                ? { ...location, ...locationData } // Actualizar la ubicación coincidente
                : location, // Mantener las demás ubicaciones intactas
          ),
        );
      } catch (err) {
        toast.error(err.message);
        throw err;
      } finally {
        setLocationsLoading(false);
      }
    },
    [authToken],
  );

  // ------------------------------------------
  // Eliminar una ubicación por su ID
  const deleteLocation = useCallback(
    async (locationId) => {
      try {
        setLocationsLoading(true);

        await apiFetch(`/locations/${locationId}/delete`, {
          authToken,
          method: 'DELETE',
        });

        // Actualizar el estado eliminando la ubicación borrada
        setLocations((prevLocations) =>
          prevLocations.locations.filter(
            (location) => location.id !== locationId,
          ),
        );
      } catch (err) {
        toast.error(err.message);
        throw err;
      } finally {
        setLocationsLoading(false);
      }
    },
    [authToken],
  );

  // ------------------------------------------
  return {
    locations,
    locationsLoading,
    getLocations,
    addLocation,
    updateLocation,
    deleteLocation,
  };
};

export default useLocations;
