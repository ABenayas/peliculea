import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { Link } from 'react-router-dom';

function UserMovies() {
  const { status } = useParams(); // 'pendiente' o 'vista'
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await api.get(`/user-movies/me/${status}`);
        setMovies(res.data);
      } catch (err) {
        console.error('❌ Error cargando películas del usuario:', err);
      }
    }

    fetchMovies();
  }, [status]);

  async function updateStatus(userMovieId: number, newStatus: 'pendiente' | 'vista') {
    try {
      await api.put(`/user-movies/${userMovieId}/status`, { status: newStatus });
      setMovies((prev) =>
        prev.map((m) => (m.id === userMovieId ? { ...m, status: newStatus } : m))
      );
    } catch (err) {
      console.error('❌ Error actualizando estado:', err);
    }
  }

  async function deleteMovie(userMovieId: number) {
    try {
      await api.delete(`/user-movies/${userMovieId}`);
      setMovies((prev) => prev.filter((m) => m.id !== userMovieId));
    } catch (err) {
      console.error('❌ Error eliminando película:', err);
    }
  }

   async function updateField(
    id: number,
    data: { notes?: string; rating?: number }
  ) {
    try {
      await api.patch(`/user-movies/${id}`, data);
      setMovies((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...data } : m))
      );
    } catch (err) {
      console.error('❌ Error actualizando campo:', err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        {status === 'pendiente' ? '🎬 Películas pendientes' : '✅ Películas vistas'}
      </h1>
      <h2 className="text-sm text-gray-400 mb-2">
        Total: {movies.length} películas
      </h2>
      <ul className="space-y-4">
        {movies.map((movie: any) => (
          <li
            key={movie.id}
            className="border p-3 rounded flex justify-between items-center bg-gray-800 text-white"
          >
            <div>
              <Link
                to={`/pelicula/${movie.movie?.tmdbId}`}
                className="hover:underline text-blue-300"
              >
              
                <strong>{movie.movie?.title || 'Sin título'}</strong>{' '}
              </Link>
              
              <span className="text-sm text-gray-400">
                ({movie.movie?.releaseDate?.slice(0, 4) || '¿?'})
              </span>
              <div className="text-sm text-gray-400 mb-1">{movie.movie?.overview || ''}</div>
              
              <textarea
                className="w-full text-sm text-black p-1 rounded mb-1"
                placeholder="Notas personales..."
                value={movie.notes || ''}
                onChange={(e) => updateField(movie.id, { notes: e.target.value })}
              />

            {movie.status === 'vista' && (
              <select
                className="text-sm p-1 rounded text-black mb-1"
                value={movie.rating || ''}
                onChange={(e) =>
                  updateField(movie.id, {
                    rating: parseInt(e.target.value) || undefined,
                  })
                }
              >
                <option value="">⭐ Puntuar</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} ⭐
                  </option>
                ))}
              </select>
            )}     

            </div>
            <div className="flex space-x-2">
              {movie.status === 'pendiente' && (
                <button
                  onClick={() => updateStatus(movie.id, 'vista')}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  ✅ Marcar como vista
                </button>
              )}
              <button
                onClick={() => deleteMovie(movie.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                ❌ Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserMovies;
