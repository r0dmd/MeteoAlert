import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../contexts/index.js';
import { apiFetch } from '../api/index.js';
import toast from 'react-hot-toast';

const useAlerts = () => {
  const { authToken } = useContext(AuthContext);

  const [alerts, setAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(false);

  // Obtener todas las alertas meteorológicas
  const getAlerts = useCallback(async () => {
    try {
      setAlertsLoading(true);

      const data = await apiFetch('/alerts', {
        authToken,
        method: 'GET',
      });
      console.log(data);

      setAlerts(data);
      return data;
    } catch (err) {
      console.error('Error al obtener alertas:', err);
      throw err;
    } finally {
      setAlertsLoading(false);
    }
  }, [authToken]);

  // Eliminar una alerta meteorológica por su ID
  const deleteAlert = useCallback(
    async (alertId) => {
      try {
        setAlertsLoading(true);

        await apiFetch(`/alerts/${alertId}/delete`, {
          authToken,
          method: 'DELETE',
        });

        // Actualizar el estado eliminando la alerta borrada
        setAlerts((prevAlerts) =>
          prevAlerts.alerts.filter((alert) => alert.id !== alertId),
        );
      } catch (err) {
        toast.error(err.message);
        throw err;
      } finally {
        setAlertsLoading(false);
      }
    },
    [authToken],
  );

  return {
    alerts,
    alertsLoading,
    getAlerts,
    deleteAlert,
  };
};

export default useAlerts;
