import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() { // Guardamos el token al hacer login.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token); // Guardamos el token.
      alert('✅ Login correcto');
      navigate('/'); // Redirige a Home.
    } catch (err) {
      alert('❌ Login incorrecto');
    }
  };

  return (
    <form onSubmit={login} className="max-w-md mx-auto mt-10 space-y-4">
      <input
        className="w-full p-2 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Iniciar sesión
      </button>
    </form>
  );
}

export default Login;
