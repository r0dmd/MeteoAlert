import { useEffect } from 'react';
import { useAlerts, useWeather, useDocumentTitle } from '../hooks/index.js';

// Pop-ups
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

// React icons
import { FaTrashCan, FaWind } from 'react-icons/fa6';
import { BsCloudRainFill } from 'react-icons/bs';
import { LiaThermometerThreeQuartersSolid } from 'react-icons/lia';

// ------------------------------------------
const AlertsPage = () => {
  useDocumentTitle('Mis alertas');

  const { alerts, getAlerts, deleteAlert } = useAlerts();
  const { fetchWeatherData } = useWeather();

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
        title: 'Eliminar alerta',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await deleteAlert(alertId);
        await getAlerts();
        toast.success('Alerta eliminada.');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRefresh = async () => {
    try {
      toast.loading('Actualizando alertas...', { id: 'refreshAlert' });
      await fetchWeatherData;
      await getAlerts();
      toast.dismiss('refreshAlert');
      toast.success('Alertas actualizadas.');
    } catch (err) {
      toast.dismiss('refreshAlert');
      toast.error(err.message);
    }
  };

  // Garantizamos un array vacío si no hay alertas.
  const alertList = alerts.alerts || [];

  return (
    <div className="container-main text-darkgray">
      <h2 className="mb-6 text-center text-3xl font-bold">Alertas</h2>

      {/* Refresh Button */}
      <div className="mb-4 flex justify-center">
        <button onClick={handleRefresh} className="btn-refresh">
          Refrescar Alertas
        </button>
      </div>

      {alertList.length > 0 ? (
        <ul className="space-y-4">
          {alertList.map((alert) => (
            <li key={alert.id} className="alert-item">
              <div className="flex items-center justify-between gap-3">
                <h3
                  className="text-3xl text-vibrantblue"
                  title={`${alert.type}`}
                  aria-label={`${alert.type}`}
                >
                  {alert.type === 'precipitación' ? (
                    <BsCloudRainFill />
                  ) : alert.type === 'viento' ? (
                    <FaWind />
                  ) : (
                    <LiaThermometerThreeQuartersSolid />
                  )}
                </h3>
                <p className="alert-text">
                  {alert.type === 'precipitación'
                    ? `${alert.value}mm`
                    : alert.type === 'viento'
                      ? `${alert.value}km/h`
                      : `${alert.value}ºC`}
                </p>
                <p className="alert-timestamp">
                  {new Date(alert.createdAt).toLocaleString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
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
