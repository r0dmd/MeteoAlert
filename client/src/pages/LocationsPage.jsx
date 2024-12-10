import { useEffect, useState } from 'react';
import Select from 'react-select'; // Importamos react-select
import { useLocations, useDocumentTitle } from '../hooks/index.js';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

// React icons
import { FaTrashCan } from 'react-icons/fa6';

// EJEMPLO DE TESTING: Lista de ciudades de España con coordenadas
const citiesInSpain = [
  {
    label: 'Madrid',
    value: 'Madrid',
    latitude: 40.416775,
    longitude: -3.70379,
  },
  {
    label: 'Barcelona',
    value: 'Barcelona',
    latitude: 41.387917,
    longitude: 2.169919,
  },
  {
    label: 'Valencia',
    value: 'Valencia',
    latitude: 39.469908,
    longitude: -0.376288,
  },
  {
    label: 'Sevilla',
    value: 'Sevilla',
    latitude: 37.38863,
    longitude: -5.98233,
  },
  {
    label: 'Zaragoza',
    value: 'Zaragoza',
    latitude: 41.648823,
    longitude: -0.889085,
  },
];

const LocationsPage = () => {
  useDocumentTitle('Mis ubicaciones');

  const {
    locations,
    getLocations,
    deleteLocation,
    updateLocation,
    addLocation,
  } = useLocations();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [editedLocation, setEditedLocation] = useState({
    location: '',
    latitude: '',
    longitude: '',
    description: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newLocation, setNewLocation] = useState({
    location: '',
    latitude: '',
    longitude: '',
    description: '',
  });
  const [selectedCity, setSelectedCity] = useState(null); // Ciudad seleccionada para rellenar coordenadas

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        await getLocations();
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchLocations();
  }, [getLocations]);

  // Maneja la selección de una ciudad del dropdown
  const handleCitySelect = (selectedOption) => {
    if (selectedOption) {
      setSelectedCity(selectedOption);
      setNewLocation({
        ...newLocation,
        location: selectedOption.label,
        latitude: selectedOption.latitude,
        longitude: selectedOption.longitude,
      });
    } else {
      setSelectedCity(null);
      setNewLocation({
        ...newLocation,
        location: '',
        latitude: '',
        longitude: '',
      });
    }
  };

  const handleDelete = async (locationId) => {
    try {
      const result = await Swal.fire({
        title: 'Eliminar ubicación',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await deleteLocation(locationId);
        toast.success('Ubicación eliminada.');
        await getLocations();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddSubmit = async () => {
    try {
      await addLocation(newLocation);
      toast.success('Ubicación añadida.');
      closeAddModal();
      await getLocations();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateLocation(selectedLocation.id, editedLocation);
      toast.success('Ubicación actualizada.');
      closeEditModal();
      await getLocations();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openEditModal = (location) => {
    setSelectedLocation(location);
    setEditedLocation({
      location: location.location,
      latitude: location.latitude,
      longitude: location.longitude,
      description: location.description,
    });
  };

  const closeEditModal = () => {
    setSelectedLocation(null);
    setEditedLocation({
      location: '',
      latitude: '',
      longitude: '',
      description: '',
    });
  };

  const openAddModal = () => {
    setIsAdding(true);
  };

  const closeAddModal = () => {
    setIsAdding(false);
    setNewLocation({
      location: '',
      latitude: '',
      longitude: '',
      description: '',
    });
    setSelectedCity(null);
  };

  const locationsList = locations.locations || [];

  return (
    <div className="flex h-fit flex-col items-center justify-center px-5 py-10 text-darkgray">
      <h2 className="mb-6 text-center text-3xl font-bold">Ubicaciones</h2>
      <button
        title="Añadir ubicación"
        onClick={openAddModal}
        className="mb-4 rounded-md bg-sunnyyellow p-2 text-darkgray transition-all hover:scale-105 hover:bg-warmyellow hover:text-whitegray"
      >
        Añadir ubicación
      </button>
      {locationsList.length > 0 ? (
        <ul className="flex w-fit max-w-xl flex-col items-center justify-center space-y-4 align-middle">
          {locationsList.map((location) => (
            <li
              key={location.id}
              className="flex h-fit w-full flex-col items-center justify-center rounded-lg bg-whitegray p-4 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex flex-col">
                <h3
                  className="text-lg font-bold text-darkgray"
                  title={`${location.location}`}
                >
                  {location.location}
                </h3>
                <p className="text-sm italic text-gray">
                  Lat: {location.latitude}, Lng: {location.longitude}
                </p>
                <p className="text-sm text-darkgray">{location.description}</p>
              </div>
              <div className="mt-2 flex justify-between gap-2">
                <button
                  onClick={() => openEditModal(location)}
                  className="h-8 rounded-md bg-skyblue px-2 text-sm text-darkgray transition-all hover:scale-105 hover:bg-vibrantblue hover:text-whitegray"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(location.id)}
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
          No hay ubicaciones disponibles.
        </p>
      )}

      {/* Modal para añadir ubicación */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-darkgray bg-opacity-50">
          <div className="m-5 w-96 rounded-lg bg-lightgray p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">Añadir ubicación</h3>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray"
              >
                Seleccionar ciudad
              </label>
              <Select
                id="city"
                options={citiesInSpain}
                value={selectedCity}
                onChange={handleCitySelect}
                isClearable
                placeholder="Selecciona una ciudad"
                className="w-full rounded border border-gray shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-gray"
              >
                Latitud
              </label>
              <input
                type="number"
                id="latitude"
                step="0.000001"
                value={newLocation.latitude}
                disabled={!!selectedCity} // Desactivado si hay ciudad seleccionada
                onChange={(e) =>
                  setNewLocation({ ...newLocation, latitude: e.target.value })
                }
                className="w-full rounded border border-gray p-2 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-gray"
              >
                Longitud
              </label>
              <input
                type="number"
                id="longitude"
                step="0.000001"
                value={newLocation.longitude}
                disabled={!!selectedCity} // Desactivado si hay ciudad seleccionada
                onChange={(e) =>
                  setNewLocation({ ...newLocation, longitude: e.target.value })
                }
                className="w-full rounded border border-gray p-2 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray"
              >
                Descripción
              </label>
              <textarea
                id="description"
                value={newLocation.description}
                onChange={(e) =>
                  setNewLocation({
                    ...newLocation,
                    description: e.target.value,
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

      {/* Modal para editar ubicación */}
      {selectedLocation && (
        <div className="fixed inset-0 flex items-center justify-center bg-darkgray bg-opacity-50">
          <div className="m-5 w-96 rounded-lg bg-lightgray p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">Editar ubicación</h3>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray"
              >
                Nombre
              </label>
              <input
                type="text"
                id="location"
                value={editedLocation.location}
                onChange={(e) =>
                  setEditedLocation({
                    ...editedLocation,
                    location: e.target.value,
                  })
                }
                className="w-full rounded border border-gray p-2 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-gray"
              >
                Latitud
              </label>
              <input
                type="number"
                id="latitude"
                step="0.000001"
                value={editedLocation.latitude}
                onChange={(e) =>
                  setEditedLocation({
                    ...editedLocation,
                    latitude: e.target.value,
                  })
                }
                className="w-full rounded border border-gray p-2 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-gray"
              >
                Longitud
              </label>
              <input
                type="number"
                id="longitude"
                step="0.000001"
                value={editedLocation.longitude}
                onChange={(e) =>
                  setEditedLocation({
                    ...editedLocation,
                    longitude: e.target.value,
                  })
                }
                className="w-full rounded border border-gray p-2 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray"
              >
                Descripción
              </label>
              <textarea
                id="description"
                value={editedLocation.description}
                onChange={(e) =>
                  setEditedLocation({
                    ...editedLocation,
                    description: e.target.value,
                  })
                }
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
    </div>
  );
};

export default LocationsPage;
