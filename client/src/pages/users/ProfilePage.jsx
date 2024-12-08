import { useDocumentTitle } from '../../hooks/index.js';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import {
  updateUser,
  updateUserWithAvatar,
  updatePassword,
} from '../../api/index.js';
import { AuthContext } from '../../contexts/index.js';

const { VITE_API_UPLOADS } = import.meta.env;

const UserProfilePage = () => {
  useDocumentTitle('Mi perfil');

  const { authToken, setUser, authUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    avatar: null,
  });
  const [passwords, setPasswords] = useState({
    oldPass: '',
    newPass: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  useEffect(() => {
    if (authUser) {
      setProfile({
        username: authUser.username,
        email: authUser.email,
        avatar: authUser.avatar || null,
      });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      await updateUser(authToken, {
        username: profile.username,
        email: profile.email,
      });
      setUser((prev) => ({
        ...prev,
        username: profile.username,
        email: profile.email,
      }));
      toast.success('Perfil actualizado con éxito.');
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || 'Error actualizando el perfil.');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = {
      username: profile.username,
      email: profile.email,
      avatar: file,
    };

    try {
      setIsUploadingAvatar(true);
      const updatedUser = await updateUserWithAvatar(authToken, formData);
      setUser(updatedUser);
      toast.success('Avatar actualizado con éxito.');
    } catch (err) {
      toast.error(err.message || 'Error actualizando el avatar.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await updatePassword(authToken, passwords.oldPass, passwords.newPass);
      toast.success('Contraseña actualizada con éxito.');
      setPasswords({ oldPass: '', newPass: '' });
    } catch (err) {
      toast.error(err.message || 'Error actualizando la contraseña.');
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-10">
      <h2 className="mb-6 text-center text-3xl font-bold">Perfil de Usuario</h2>

      {/* Información de perfil */}
      <div className="mb-6">
        <h3 className="text-center text-xl font-bold">Información de Perfil</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Nombre de Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={profile.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
            />
          </div>
        </div>
        {isEditing ? (
          <button onClick={handleProfileUpdate} className="btn-save">
            Guardar Cambios
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Editar Perfil
          </button>
        )}
      </div>

      {/* Avatar */}
      <div className="mb-6">
        <h3 className="text-center text-xl font-bold">Avatar</h3>
        <div className="flex items-center space-x-4">
          {profile.avatar ? (
            <img
              src={
                VITE_API_UPLOADS + '/' + authUser.avatar ||
                VITE_API_UPLOADS + '/default-avatar.png'
              }
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray"></div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            disabled={isUploadingAvatar}
            className="input-field"
          />
        </div>
      </div>

      {/* Datos adicionales */}
      <div className="mb-6">
        <h3 className="text-center text-xl font-bold">Datos Adicionales</h3>
        <p>
          <strong>Rol:</strong> {authUser?.role || 'N/A'}
        </p>
        <p>
          <strong>Fecha de Creación:</strong>{' '}
          {authUser?.createdAt
            ? new Date(authUser.createdAt).toLocaleDateString()
            : 'N/A'}
        </p>
      </div>

      {/* Cambio de contraseña */}
      <div>
        <h3 className="text-center text-xl font-bold">Cambio de Contraseña</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="oldPass" className="block text-sm font-medium">
              Contraseña Actual
            </label>
            <input
              id="oldPass"
              name="oldPass"
              type="password"
              value={passwords.oldPass}
              onChange={handlePasswordChange}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="newPass" className="block text-sm font-medium">
              Nueva Contraseña
            </label>
            <input
              id="newPass"
              name="newPass"
              type="password"
              value={passwords.newPass}
              onChange={handlePasswordChange}
              className="input-field"
            />
          </div>
        </div>
        <button onClick={handlePasswordUpdate} className="btn-change-password">
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
