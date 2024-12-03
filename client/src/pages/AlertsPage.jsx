import { useEffect } from 'react';
import { useAlerts, useDocumentTitle } from '../hooks/index.js';
import { toast } from 'react-hot-toast';

// @@@ quitar error No se encontraron alertas declaradas para este usuario, y poner un sweetalert2 de confirmación al darle a eliminar alerta

// ------------------------------------------
const AlertsPage = () => {
  useDocumentTitle('Mis alertas');

  const { alerts, getAlerts, deleteAlert } = useAlerts();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        await getAlerts();
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchAlerts();
  }, [getAlerts]);

  const handleDelete = async (alertId) => {
    try {
      await deleteAlert(alertId);
      toast.success('Alerta eliminada correctamente.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const alertList = alerts.alerts || []; // Garantizamos un array vacío si no hay alertas.

  return (
    <div>
      <h2>Historial de alertas</h2>
      {alertList.length > 0 ? (
        <ul>
          {alertList.map((alert) => (
            <li key={alert.id}>
              <div>
                <h3>{alert.type}</h3>
                <p>{`Valor: ${alert.value}`}</p>
                <p>{`Fecha: ${new Date(alert.createdAt).toLocaleDateString()}`}</p>
                <button onClick={() => handleDelete(alert.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay alertas disponibles.</p>
      )}
    </div>
  );
};

export default AlertsPage;
