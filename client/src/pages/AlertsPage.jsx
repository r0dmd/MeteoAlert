import { useEffect } from 'react';
import { useAlerts, useDocumentTitle } from '../hooks/index.js';

// Pop-ups
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

// React icons
import { FaTrashCan } from 'react-icons/fa6';

// @@@ quitar error No se encontraron alertas declaradas para este usuario

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
      // Usar SweetAlert2 para confirmar eliminación
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Esta acción no se puede deshacer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await deleteAlert(alertId);
        toast.success('Alerta eliminada correctamente.');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const alertList = alerts.alerts || []; // Garantizamos un array vacío si no hay alertas.

  return (
    <div className="h-fit px-5 py-10 text-darkgray">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Historial de alertas
      </h2>
      {alertList.length > 0 ? (
        <ul className="flex w-full max-w-xl space-y-4 px-4">
          {alertList.map((alert) => (
            <li
              key={alert.id}
              className="w-full rounded-lg bg-whitegray p-4 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div>
                <h3 className="text-xl font-semibold text-vibrantblue">
                  {alert.type}
                </h3>
                <p className="text-gray">Valor: {alert.value}</p>
                <p className="text-gray">
                  Fecha: {new Date(alert.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleDelete(alert.id)}
                  className="rounded-md bg-red p-2 text-whitegray transition-all hover:scale-105 hover:bg-warmyellow"
                >
                  <FaTrashCan />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-2xl italic text-gray">
          No hay alertas disponibles.
        </p>
      )}
    </div>
  );
};

export default AlertsPage;
