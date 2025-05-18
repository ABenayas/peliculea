import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import useCurrentUser from '../hooks/useCurrentUser';

function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('❌ Error al conectar con el backend:', error);
      }
    }

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Hola, {currentUser?.name || 'usuario'} 👋</h1>
          <p className="text-sm text-gray-300">{currentUser?.email}</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Enlaces a películas */}
      <div className="mb-6 space-x-4">
        <Link
          to="/user-movies/pendiente"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ver pendientes
        </Link>
        <Link
          to="/user-movies/vista"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ver vistas
        </Link>
      </div>

      <p>Consulta la consola para ver si el backend responde.</p>
      <ul className="mt-4">
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;




