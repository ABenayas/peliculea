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
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-6"
      style={{ backgroundImage: "url('/images/avatar-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 max-w-4xl bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-white p-6 md:flex md:gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
          alt={movie.title}
          className="rounded mb-4 md:mb-0"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-4">{movie.releaseDate}</p>
          <p className="mb-4">{movie.overview}</p>
          <p><strong>🕒 Duración:</strong> {movie.runtime} min</p>
          <p><strong>🎬 Director:</strong> {movie.director}</p>
          <p><strong>🌍 País:</strong> {movie.country || 'Desconocido'}</p>
          <p><strong>🎞️ Género:</strong> {movie.genres || 'Sin género'}</p>
          <p><strong>🎭 Actores:</strong> {movie.actors?.join(', ') || 'No disponibles'}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;


