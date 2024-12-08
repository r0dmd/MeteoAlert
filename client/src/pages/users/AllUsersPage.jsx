import { useContext, useEffect, useState } from 'react';
import { useDocumentTitle } from '../../hooks/index.js';
import { AuthContext } from '../../contexts/index.js';

// Servicios de usuario
import { deleteUser, getAllUsers } from '../../api/index.js';

import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
// React icons
import { FaTrashCan } from 'react-icons/fa6';

const AllUsersPage = () => {
  useDocumentTitle('Listado de usuarios');

  const { isAdmin, authToken } = useContext(AuthContext);

  // Estado para gestionar la lista de usuarios y el estado de carga
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga

  // Hook siempre se ejecuta, incluso si no es admin.
  useEffect(() => {
    // Si no hay token o no es admin, no cargamos usuarios
    if (!authToken || !isAdmin()) {
      console.log('No se carga usuarios, falta token o no es admin.');
      return; // No hace nada si no se cumplen las condiciones
    }

    // Función para cargar los usuarios
    const fetchUsers = async () => {
      try {
        console.log('Cargando usuarios...');
        const response = await getAllUsers(authToken); // Recupera todos los usuarios
        console.log('Usuarios cargados:', response); // Verifica la respuesta
        setUsers(response); // Almacena los usuarios en el estado
      } catch (err) {
        console.error('Error al cargar los usuarios:', err);
        toast.error('Error al cargar los usuarios.');
      } finally {
        setLoading(false); // Cambia el estado de carga a falso una vez que se ha terminado de cargar
      }
    };

    fetchUsers();
  }, [authToken, isAdmin]); // Dependencias que incluyen authToken e isAdmin

  // Función para manejar la eliminación de un usuario
  const handleDelete = async (userId) => {
    try {
      // Usar SweetAlert2 para confirmar eliminación
      const result = await Swal.fire({
        title: 'Eliminar usuario',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await deleteUser(authToken, userId); // Llama a la función para eliminar al usuario
        // Actualiza la lista de usuarios después de la eliminación
        setUsers(users.filter((user) => user._id !== userId));
        toast.success('Usuario eliminado.');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Si el usuario no es admin, muestra un mensaje.
  if (!isAdmin()) {
    return <p>No tienes permisos para acceder a esta página.</p>;
  }

  return (
    <div className="h-fit px-5 py-10 text-darkgray">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Listado de Usuarios
      </h2>

      {/* Mostrar mensaje de carga mientras esperamos los datos */}
      {loading ? (
        <p className="text-center text-xl">Cargando usuarios...</p>
      ) : // Listado de usuarios
      users.length > 0 ? (
        <ul className="max-w-xl space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="mx-auto h-fit w-fit rounded-lg bg-whitegray p-4 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-semibold text-darkgray">
                    {user.username}
                  </h3>
                  <p className="text-gray">Email: {user.email}</p>
                  <p className="text-gray">
                    Registrado: {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(user._id)} // Llama a handleDelete con el id del usuario
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
          No hay usuarios disponibles.
        </p>
      )}
    </div>
  );
};

export default AllUsersPage;
