import { Injectable } from '@nestjs/common';
import axios from 'axios'; // Es una librería de Node.js que sirve para hacer peticiones HTTP (como Postman, pero desde el código). Se le indica la URL y nos trae datos.

@Injectable()
export class MoviesService {
  private readonly apiUrl = 'https://api.themoviedb.org/3';

  async searchMovies(query: string): Promise<any[]> { // Se crea esta función para generar un primera vista sencilla, a la que se podrá clicar.
    try {
      const response = await axios.get(`${this.apiUrl}/search/movie`, {
        params: { query },
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          accept: 'application/json',
        },
      });

      // Mapeamos solo los campos que queremos devolver.
      return response.data.results.map((movie: any) => ({ // La API devuelve una lista gigante de pelis dentro de response.data.results. Con .map() se recorre cada peli y crea un nuevo objeto con solo los campos que me interesan.
        tmdbId: movie.id, // De cada peli que me devuelve en results, crea un nuevo objeto con estas propiedades, ejemplo de id: el valor que tiene movie.id. Es acceder al campo id dentro del objeto movie que viene del JSON. El punto (.) es la forma de entrar a una propiedad dentro de un objeto.
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
      }));
    } catch (error) {
      console.error('Error al buscar películas:', error.message);
      throw new Error('No se pudieron obtener resultados');
    }
  }

  async getMovieDetails(id: string): Promise<any> { // Generamos esta segunda función, que será la que aporte los detalles de la película al clicar en la "vista" de la anterior función.
    try {
      const movieResponse = await axios.get(`${this.apiUrl}/movie/${id}`, { // Obtenemos los datos principales de la película.
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          accept: 'application/json',
        },
      });
  
      const creditsResponse = await axios.get(`${this.apiUrl}/movie/${id}/credits`, { // Obtenemos los créditos para extraer el director.
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          accept: 'application/json',
        },
      });
  
      const movie = movieResponse.data;
      const crew = creditsResponse.data.crew;
      const cast = creditsResponse.data.cast || [];

      const director = crew.find((person: any) => person.job === 'Director');
      const topActors = cast.slice(0, 5).map((actor: any) => actor.name); // Los primeros 5.
      const country = movie.production_countries?.[0]?.name || 'Desconocido';
      const genres = movie.genres?.map((g: any) => g.name).join(', ') || 'Sin género';
  
      // Devolvemos solo los campos que nos interesan.
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path || '',
        releaseDate: movie.release_date || '',
        runtime: movie.runtime,
        director: director ? director.name : 'Desconocido',
        actors: topActors,
        country,
        genres,
      };
    } catch (error) {
      console.error('Error al obtener detalles de la película:', error.message);
      throw new Error('No se pudieron obtener los detalles');
    }
  }
  
}
