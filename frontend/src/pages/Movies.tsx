import { useState,useEffect } from 'react';
import api from '../api';
import useCurrentUser from '../hooks/useCurrentUser';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Movie {
  tmdbId: number;
  title: string;
  releaseDate: string;
  posterPath: string;
  overview: string;
}

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Movie[]>([]);
  const [status, setStatus] = useState<'pendiente' | 'vista'>('pendiente');
  const currentUser = useCurrentUser();

  const fetchMovies = async (query?: string) => {
    const q = query || searchTerm;
    console.log(`🔍 Buscando "${q}"...`);
    try {
      const res = await api.get(`/movies/search?query=${q}`);
      setResults(res.data);
    } catch (err) {
      console.error('❌ Error buscando películas:', err);
    }
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchTerm(q);
      fetchMovies(q);
    }
  }, []);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchTerm(q); // Mantiene el input sincronizado con la URL
    if (q) fetchMovies(q); // Opcional: vuelve a lanzar la búsqueda al hacer "atrás"
  }, [searchParams]); // Se ejecuta cada vez que cambia la URL


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchParams({ q: searchTerm });
      fetchMovies();
    }
  };

  const handleAdd = async (movie: Movie) => {
    if (!currentUser) return;
    try {
      await api.post(`/user-movies/${currentUser.id}`, {
        tmdbId: movie.tmdbId,
        title: movie.title,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
        overview: movie.overview,
        status,
      });
      toast.success(`Añadida como ${status}`);
    } catch (err) {
      console.error('❌ Error al añadir película:', err);
    }
  };

  return (
  <div
    className="relative min-h-screen bg-cover bg-center bg-no-repeat p-6 text-white"
    style={{ backgroundImage: "url('/images/avatar-bg.jpg')" }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

    {/* Volver al inicio arriba a la izquierda */}
    <Link
      to="/"
      className="absolute top-6 left-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow z-10 inline-block"
    >
      ← Volver al inicio
    </Link>

    <div className="relative z-10 w-full max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Buscar películas</h1>

      <div className="flex flex-col items-center w-full mb-4">
        <input
          type="text"
          value={searchTerm}
          placeholder="Escribe el título..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-black border-gray-500 border p-2 rounded w-full max-w-xl mb-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'pendiente' | 'vista')}
          className="bg-gray-600 text-white border border-gray-700 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="pendiente">Añadir como pendiente</option>
          <option value="vista">Añadir como vista</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {results
          .filter((movie) => movie.tmdbId)
          .map((movie) => (
            <div key={`${movie.tmdbId}-${movie.title}`} className="bg-gray-800 rounded-xl p-4 shadow hover:scale-105 transition-transform">
              <Link to={`/pelicula/${movie.tmdbId}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover mb-2 rounded"
                />
              </Link>
              <Link to={`/pelicula/${movie.tmdbId}`} className="hover:underline text-blue-300">
                <h2 className="font-semibold">{movie.title}</h2>
              </Link>
              <p className="text-sm text-gray-400">{movie.releaseDate}</p>
              <button
                onClick={() => handleAdd(movie)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow w-full"
              >
                Añadir
              </button>
            </div>
          ))}
      </div>
    </div>
  </div>
);


}

export default Movies;

