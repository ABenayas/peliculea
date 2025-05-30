import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import useCurrentUser from '../hooks/useCurrentUser';

function Home() {
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/auth/profile');
        setCurrentUserData(response.data);
      } catch (error) {
        console.error('❌ Error al obtener usuario:', error);
      }
    }

    fetchData();
  }, []);

  const logout = () => {
    const confirmed = window.confirm('¿Estás seguro de que quieres cerrar sesión?');
  if (!confirmed) return;
  
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: "url('/images/avatar-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 text-white">
        {/* Cerrar sesión */}
        <div className="flex justify-end mb-4">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Saludo + botones centrales */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mb-1">
            Hola, {currentUser?.name || currentUserData?.name || 'usuario'}!
          </h1>
          <p className="text-sm text-gray-300 mb-6">
            {currentUser?.email || currentUserData?.email}
          </p>
          <h2 className="text-2xl font-bold mb-1">
            LISTAS
          </h2>

          {/* Botones listas */}
          <div className="flex space-x-4 mb-6">
            <Link
              to="/user-movies/pendiente"
              className="w-40 text-center bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded shadow"
            >
              Pendientes
            </Link>
            <Link
              to="/user-movies/vista"
              className="w-40 text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
            >
              Vistas
            </Link>
          </div>

          {/* Botón buscar pelis */}
          <Link
            to="/movies"
            className="bg-gray-600 hover:bg-gray-700 text-white px-16 py-6 rounded shadow mt-40"
          >
            BUSCAR PELÍCULAS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;






