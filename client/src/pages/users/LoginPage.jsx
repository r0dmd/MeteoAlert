import { useContext, useState } from 'react';
import { loginUser } from '../../api/index.js';
import { AuthContext } from '../../contexts/index.js';

import { useDocumentTitle } from '../../hooks/index.js';
import { useGoHome } from '../../hooks/index.js';
import toast from 'react-hot-toast';

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
      const { token, user } = await loginUser({ email, password });
      authLoginState(token);
      console.log('Usuario autenticado:', user);
      toast.success('Bienvenido');
      goHome();

      // Redirigimos a la página principal.
      toast.success('Bienvenido');
      goHome();
    } catch (err) {
      toast.error(err.message, {
        id: 'login',
      });
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
    <form onSubmit={handleLogin}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        required
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Contraseña'
        required
      />
      <button disabled={loading}>Iniciar Sesión</button>
    </form>
  );
};

export default LoginPage;
