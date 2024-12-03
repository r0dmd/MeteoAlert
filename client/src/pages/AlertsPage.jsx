import { useState, useEffect } from 'react';
import { useAlerts, useDocumentTitle } from '../hooks/index.js';
import { toast } from 'react-hot-toast';

const AlertsPage = () => {
  useDocumentTitle('Mis alertas');

  // Accede a la propiedad 'alerts' del objeto que devuelve el hook
  const {
    alerts: alertsData = [],
    alertsLoading,
    addAlert,
    getAlerts,
    deleteAlert,
  } = useAlerts();
  const [newAlert, setNewAlert] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        await getAlerts();
      } catch (error) {
        toast.error('Error al obtener alertas: ' + error.message);
      }
    };

    fetchAlerts();
  }, [getAlerts]);

  const handleAddAlert = async () => {
    try {
      if (!newAlert.trim()) {
        toast.error('El contenido de la alerta no puede estar vacío.');
        return;
      }
      await addAlert(newAlert);
      toast.success('¡Alerta agregada con éxito!');
      setNewAlert('');
    } catch (error) {
      toast.error('Error al agregar la alerta: ' + error.message);
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await deleteAlert(id);
      toast.success('¡Alerta eliminada con éxito!');
    } catch (error) {
      toast.error('Error al eliminar la alerta: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Mis Alertas</h1>
      <div>
        <input
          type="text"
          value={newAlert}
          onChange={(e) => setNewAlert(e.target.value)}
          placeholder="Nueva alerta"
        />
        <button onClick={handleAddAlert}>Agregar Alerta</button>
      </div>
      {alertsLoading ? (
        <p>Cargando alertas...</p>
      ) : (
        <ul>
          {Array.isArray(alertsData) &&
            alertsData.map((alert) => (
              <li key={alert.createdAt}>
                <p>Tipo: {alert.type}</p>
                <p>Valor: {alert.value}</p>
                <button onClick={() => handleDeleteAlert(alert.createdAt)}>
                  Eliminar
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsPage;
