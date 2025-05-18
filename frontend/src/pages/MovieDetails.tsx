import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error('❌ Error cargando detalles:', err);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="p-6 text-white">Cargando detalles...</div>;

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
          alt={movie.title}
          className="rounded"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-2">🎬 {movie.releaseDate}</p>
          <p className="mb-4">{movie.overview}</p>
          <p><strong>🕒 Duración:</strong> {movie.runtime} min</p>
          <p><strong>🎬 Director:</strong> {movie.director}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

