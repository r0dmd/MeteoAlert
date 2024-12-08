import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/index.js'; // Ya está importada la función registerUser

import { useDocumentTitle } from '../../hooks/index.js';
import toast from 'react-hot-toast';

// ------------------------------------------
const RegisterPage = () => {
  // Titulo de la pestaña
  useDocumentTitle('Registro de usuario');

  // Estados para cada campo del formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(false);

  // Navegación
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);

      // Hacer la llamada a la API para registrar al usuario
      const userData = { username, email, password };
      await registerUser(userData);

      toast.success('Registro exitoso');
      navigate('/login');
      // Aquí podrías redirigir al usuario a la página de login o home
      // Por ejemplo, redirigir a la página de login:
      // navigate('/login');
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleRegister} className="login-form">
        <h2 className="mb-6 text-center text-2xl text-whitegray">
          Crear cuenta
        </h2>

        {/* Nombre de usuario */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required
          className="login-input"
        />

        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input"
        />

        {/* Contraseña */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="login-input"
        />

        {/* Confirmar contraseña */}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
          required
          className="login-input"
        />

        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Cargando...' : 'Registrar cuenta'}
        </button>

        {loading && <p className="loading-text">Por favor, espere...</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
