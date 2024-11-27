import { useContext, useState } from 'react';
import { loginUser } from '../../api/index.js';
import { AuthContext } from '../../contexts/index.js';

import { useDocumentTitle } from '../../hooks/index.js';
import toast from 'react-hot-toast';

// ------------------------------------------
const LoginPage = () => {
  useDocumentTitle('Iniciar sesión');

  const { authLoginState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser({ email, password });
      authLoginState(token); // Guardar el token en el contexto.
      console.log('Usuario autenticado:', user);
    } catch (err) {
      toast.error(err.message);
    }
  };

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
      <button type='submit'>Iniciar Sesión</button>
    </form>
  );
};

export default LoginPage;
