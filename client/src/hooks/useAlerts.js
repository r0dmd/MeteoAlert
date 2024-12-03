import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/index.js';

import { apiFetch } from '../api/index.js';

import toast from 'react-hot-toast';

// ------------------------------------------
const useAlerts = () => {
  const { authToken } = useContext(AuthContext);

  const [alerts, setAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(false);

  // Crear una nueva alerta meteorológica
  const addAlert = async (alertData) => {
    try {
      setAlertsLoading(true);

      const data = await apiFetch('/alerts/new', {
        authToken,
        method: 'POST',
        body: JSON.stringify(alertData),
      });

      // Opcionalmente actualiza el estado de alertas
      setAlerts((prevAlerts) => [...prevAlerts, data]);
      return data;
    } catch (err) {
      console.error('Error al añadir alerta:', err);
      throw err;
    } finally {
      setAlertsLoading(false);
    }
  };

  // Obtener todas las alertas meteorológicas
  const getAlerts = async () => {
    try {
      setAlertsLoading(true);

      const data = await apiFetch('/alerts', {
        authToken,
        method: 'GET',
      });

      setAlerts(data);
      return data;
    } catch (err) {
      console.error('Error al obtener alertas:', err);
      throw err;
    } finally {
      setAlertsLoading(false);
    }
  };

  // Eliminar una alerta meteorológica por su ID
  const deleteAlert = async (alertId) => {
    try {
      setAlertsLoading(true);

      await apiFetch(`/alerts/${alertId}/delete`, {
        authToken,
        method: 'DELETE',
      });

      // Actualizar el estado eliminando la alerta borrada
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.id !== alertId),
      );
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setAlertsLoading(false);
    }
  };

  return {
    alerts,
    alertsLoading,
    addAlert,
    getAlerts,
    deleteAlert,
  };
};

export default useAlerts;
