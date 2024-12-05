import { useEffect, useState } from 'react';
import { usePreferences, useDocumentTitle } from '../hooks/index.js';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

// React icons
import { FaTrashCan } from 'react-icons/fa6';
import { BsCloudRainFill } from 'react-icons/bs';
import { LiaThermometerThreeQuartersSolid } from 'react-icons/lia';
import { FaWind } from 'react-icons/fa6';

// ------------------------------------------
const PreferencesPage = () => {
  useDocumentTitle('Mis preferencias');

  const {
    preferences,
    getPreferences,
    deletePreference,
    updatePreference,
    addPreference,
  } = usePreferences();

  const [selectedPreference, setSelectedPreference] = useState(null); // Preferencia seleccionada para edición
  const [editedThreshold, setEditedThreshold] = useState(''); // Umbral editado
  const [isAdding, setIsAdding] = useState(false); // Modal para añadir preferencia
  const [newPreference, setNewPreference] = useState({
    type: 'temperatura',
    threshold: '',
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        await getPreferences();
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchPreferences();
  }, [getPreferences]);

  const handleDelete = async (preferenceId) => {
    try {
      const result = await Swal.fire({
        title: 'Eliminar preferencia',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await deletePreference(preferenceId);
        toast.success('Preferencia eliminada.');
        // Refrescar preferencias después de eliminar
        await getPreferences();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddSubmit = async () => {
    try {
      await addPreference(newPreference);
      toast.success('Preferencia añadida.');
      closeAddModal();
      // Refrescar preferencias después de añadir
      await getPreferences();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openEditModal = (preference) => {
    setSelectedPreference(preference);
    setEditedThreshold(preference.threshold);
  };

  const closeEditModal = () => {
    setSelectedPreference(null);
    setEditedThreshold('');
  };

  const handleEditSubmit = async () => {
    try {
      await updatePreference(selectedPreference.id, {
        threshold: editedThreshold,
      });
      toast.success('Umbral actualizado.');
      closeEditModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openAddModal = () => {
    setIsAdding(true);
  };

  const closeAddModal = () => {
    setIsAdding(false);
    setNewPreference({
      type: 'temperatura',
      threshold: '',
    });
  };

  const preferencesList = preferences.preferences || []; // Garantizar un array vacío si no hay preferencias

  return (
    <div className="h-fit px-5 py-10 text-darkgray">
      <h2 className="mb-6 text-center text-3xl font-bold">Preferencias</h2>
      <button
        title="Añadir preferencia"
        onClick={openAddModal}
        className="mb-4 rounded-md bg-sunnyyellow p-2 text-darkgray transition-all hover:scale-105 hover:bg-warmyellow hover:text-whitegray"
      >
        Añadir preferencia
      </button>
      {preferencesList.length > 0 ? (
        <ul className="max-w-xl space-y-4">
          {preferencesList.map((preference) => (
            <li
              key={preference.id}
              className="h-fit w-full rounded-lg bg-whitegray p-2 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3
                  className="text-3xl text-vibrantblue"
                  title={`${preference.type}`}
                  aria-label={`${preference.type}`}
                >
                  {preference.type === 'precipitación' ? (
                    <BsCloudRainFill />
                  ) : preference.type === 'viento' ? (
                    <FaWind />
                  ) : (
                    <LiaThermometerThreeQuartersSolid />
                  )}
                </h3>
                <p className="font-montserrat text-lg font-semibold italic text-darkgray">
                  {preference.type === 'precipitación'
                    ? `${preference.threshold}mm`
                    : preference.type === 'viento'
                      ? `${preference.threshold}km/h`
                      : `${preference.threshold}ºC`}
                </p>
                <button
                  onClick={() => openEditModal(preference)}
                  className="h-8 rounded-md bg-skyblue px-2 text-sm text-darkgray transition-all hover:scale-105 hover:bg-vibrantblue hover:text-whitegray"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(preference.id)}
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
          No hay preferencias disponibles.
        </p>
      )}

      {/* Modal para editar umbral */}
      {selectedPreference && (
        <div className="fixed inset-0 flex items-center justify-center bg-darkgray bg-opacity-50">
          <div className="m-5 w-96 rounded-lg bg-lightgray p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">Actualizar preferencia</h3>
            <div className="mb-4">
              <label
                htmlFor="threshold"
                className="block text-sm font-medium text-gray"
              >
                Umbral
              </label>
              <input
                type="number"
                id="threshold"
                required
                value={editedThreshold}
                onChange={(e) => setEditedThreshold(e.target.value)}
                className="w-full rounded border border-gray p-2 shadow-sm"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeEditModal}
                className="rounded px-4 py-2 text-darkgray hover:font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditSubmit}
                className="rounded px-4 py-2 text-darkgray hover:font-bold"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir preferencia */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-darkgray bg-opacity-50">
          <div className="m-5 w-96 rounded-lg bg-lightgray p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">Añadir preferencia</h3>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray"
              >
                Tipo
              </label>
              <select
                id="type"
                value={newPreference.type}
                onChange={(e) =>
                  setNewPreference({ ...newPreference, type: e.target.value })
                }
                className="w-full overflow-hidden rounded border border-gray p-2 shadow-sm"
              >
                <option value="temperatura">Temperatura</option>
                <option value="precipitación">Precipitación</option>
                <option value="viento">Viento</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="threshold"
                className="block text-sm font-medium text-gray"
              >
                Umbral
              </label>
              <input
                type="number"
                id="threshold"
                required
                value={newPreference.threshold}
                onChange={(e) =>
                  setNewPreference({
                    ...newPreference,
                    threshold: e.target.value,
                  })
                }
                className="w-full rounded border border-gray p-2 shadow-sm"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeAddModal}
                className="rounded px-4 py-2 text-darkgray hover:font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSubmit}
                className="rounded px-4 py-2 text-darkgray hover:font-bold"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesPage;
