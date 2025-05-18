import { useState } from 'react';
import api from '../api';
import useCurrentUser from '../hooks/useCurrentUser';
import { Link, useSearchParams } from 'react-router-dom';

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

  const fetchMovies = async () => {
    console.log(`🔍 Buscando "${searchTerm}"...`);
    try {
      const res = await api.get(`/movies/search?query=${searchTerm}`);
      setResults(res.data);
    } catch (err) {
      console.error('❌ Error buscando películas:', err);
    }
  };

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
      alert(`🎉 Añadida como ${status}`);
    } catch (err) {
      console.error('❌ Error al añadir película:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar películas</h1>

      <input
        type="text"
        value={searchTerm}
        placeholder="Escribe el título..."
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border p-2 rounded w-full mb-4"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'pendiente' | 'vista')}
        className="mb-4 border p-2 rounded"
      >
        <option value="pendiente">Añadir como pendiente</option>
        <option value="vista">Añadir como vista</option>
      </select>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results
          .filter((movie) => movie.tmdbId)
          .map((movie) => (
            <div key={`${movie.tmdbId}-${movie.title}`} className="border rounded p-2">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                alt={movie.title}
                className="w-full h-64 object-cover mb-2"
              />
              <Link to={`/pelicula/${movie.tmdbId}`} className="hover:underline text-blue-300">
                <h2 className="font-semibold">{movie.title}</h2>
              </Link>
              <p className="text-sm text-gray-500">{movie.releaseDate}</p>
              <button
                onClick={() => handleAdd(movie)}
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              >
                Añadir
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Movies;

