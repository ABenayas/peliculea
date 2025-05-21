import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

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
        newStatus === 'vista'
          ? prev.filter((m) => m.id !== userMovieId) // Eliminar de "pendientes" visualmente
          : prev.map((m) => (m.id === userMovieId ? { ...m, status: newStatus } : m))
      );
    } catch (err) {
      console.error('❌ Error actualizando estado:', err);
    }
  }

  async function deleteMovie(userMovieId: number) {
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar esta película de la lista?');
    if (!confirmed) return;

    try {
      await api.delete(`/user-movies/${userMovieId}`);
      setMovies((prev) => prev.filter((m) => m.id !== userMovieId));
    } catch (err) {
      console.error('❌ Error eliminando película:', err);
    }
  }

  async function updateField(id: number, data: { notes?: string; rating?: number }) {
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
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: "url('/images/avatar-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 text-white">
        {/* Botón volver */}
        <div className="flex justify-end mb-4">
          <Link
            to="/"
            className="absolute top-6 left-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow z-10 inline-block"
          >
            ← Volver al inicio
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-1 text-center">
          {status === 'pendiente' ? 'Películas pendientes' : 'Películas vistas'}
        </h1>
        <p className="text-sm text-gray-300 mb-6 text-center">
          Total: {movies.length} películas
        </p>

        <ul className="space-y-4">
          {movies.map((movie: any) => (
            <li
              key={movie.id}
              className="border p-3 rounded flex gap-4 bg-gray-800 text-white"
            >
              {/* Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.movie?.posterPath}`}
                alt={movie.movie?.title}
                className="w-28 h-auto object-cover rounded"
              />
              
              {/* Contenido */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div className="flex-1">
                  <Link
                    to={`/pelicula/${movie.movie?.tmdbId}`}
                    className="hover:underline text-blue-300"
                  >
                    <strong>{movie.movie?.title || 'Sin título'}</strong>
                  </Link>
                  <span className="text-sm text-gray-400 ml-2">
                    ({movie.movie?.releaseDate?.slice(0, 4) || '¿?'})
                  </span>
                  <div className="text-sm text-gray-400 mb-2">
                    {movie.movie?.overview || ''}
                  </div>

                  <textarea
                    className="w-full md:w-11/12 text-sm text-black p-2 rounded mb-2"
                    placeholder="Notas personales..."
                    value={movie.notes || ''}
                    onChange={(e) =>
                      updateField(movie.id, { notes: e.target.value })
                    }
                  />

                  {movie.status === 'vista' && (
                    <select
                      className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-white"
                      value={movie.rating || ''}
                      onChange={(e) =>
                        updateField(movie.id, {
                          rating: parseInt(e.target.value) || undefined,
                        })
                      }
                    >
                      <option value="">Puntuación</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {'⭐'.repeat(n)}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="flex flex-col space-y-2 justify-center">
                  {movie.status === 'pendiente' && (
                    <button
                      onClick={() => updateStatus(movie.id, 'vista')}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow text-sm"
                    >
                      ✅ Añadir a vistas
                    </button>
                  )}
                  <button
                    onClick={() => deleteMovie(movie.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow text-sm mt-40"
                  >
                    ❌ Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserMovies;
