import { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Ya que, como autor de este proyeto, nunca se había tenido relación con frontend, se consulta a ChatGPT sobre esta primera vista para hacer uso de ella como plantilla para las restantes. (ChatGPT, s.f.)
// Para el estilo de las vistas se acude a documentación oficial de Tailwind CSS. (Tailwind CSS, s.f.)
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password }); // El token es enviado por auth.service.ts cuando se hace login (método login)
      localStorage.setItem('token', res.data.access_token); // El token se guarda en localStorage, queda guardado localmente en el navegador hasta que el usuario cierre sesión.
      toast.success('Login correcto');
      navigate('/');
    } catch (err: any) {
      console.error('❌ Error en login:', err);
      alert('❌ Login incorrecto');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/peliculea-bg.jpg")' }}
    >
      <form
        onSubmit={login}
        className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full space-y-4 mt-[-400px]"
      >

        <input
          className="w-full p-2 rounded text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 rounded text-black"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Iniciar sesión
        </button>
        <p className="text-center text-sm text-gray-400 mt-4">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-400 underline hover:text-blue-200">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
