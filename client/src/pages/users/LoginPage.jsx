import { useContext, useState } from 'react';
import { loginUser } from '../../api/index.js';
import { AuthContext } from '../../contexts/index.js';

import { useDocumentTitle } from '../../hooks/index.js';
import { useGoHome } from '../../hooks/index.js';
import toast from 'react-hot-toast';

import { jwtDecode } from 'jwt-decode';

// ------------------------------------------
const LoginPage = () => {
  // Titulo de pestaña
  useDocumentTitle('Iniciar sesión');

  // Importamos los datos del usuario y la función que almacena el token.
  const { authUser, authLoginState } = useContext(AuthContext);

  // Importamos el hook personalizado de Navigate
  const goHome = useGoHome();

  // Declaramos una variable en el State para definir el valor de cada input.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Variable que indica cuando termina el fetch.
  const [loading, setLoading] = useState(false);

  // Función que maneje el envío del formulario.
  const handleLogin = async (e) => {
    try {
      // Prevenimos el comportamiento por defecto del formulario.
      e.preventDefault();

      // Indicamos que va a dar comienzo el fetch.
      setLoading(true);

      // Obtenemos una respuesta.
      const { token } = await loginUser({ email, password });
      authLoginState(token);

      // Decodificamos el token para extraer de los datos de usuario su nombre para lanzarle un mensaje de bienvenida personalizado, y redirigimos a Inicio.
      const username = jwtDecode(token).username;
      toast.success(`Hola, ${username}`);
      goHome();
    } catch (err) {
      toast.error(err.message);
    } finally {
      // Indicamos que ha finalizado el fetch.
      setLoading(false);
    }
  };

  // Si estamos logeados restringimos el acceso redirigiendo a la página principal.
  // En este caso utilizaremos el componente Navigate (en lugar de la función).
  if (authUser) {
    return goHome();
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="mb-6 text-center text-2xl text-whitegray">
          Iniciar sesión
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="login-input"
        />

        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>

        {loading && <p className="loading-text">Por favor, espere...</p>}
      </form>
    </div>
  );
};

export default LoginPage;
