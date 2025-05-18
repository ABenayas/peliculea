import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMovie } from './user-movie.entity';
import { Movie } from '../movies/movie.entity';
import { User } from '../users/user.entity';
import { UserMoviesDto } from './dto/user-movies.dto';
import { UpdateUserMoviesDto } from './dto/update-user-movies.dto';

@Injectable()
export class UserMoviesService {
  constructor(
    @InjectRepository(UserMovie)
    private userMovieRepo: Repository<UserMovie>,

    @InjectRepository(Movie) // Inyectamos también el repositorio de películas.
    private movieRepo: Repository<Movie>,
  ) {}

  // Añade una película a la lista del usuario. Si la película no existe en nuestra base, la creamos.
  async addMovieToList(
    user: User,
    movieData: UserMoviesDto, // Este apartado, el movieData, se cambia al crear el DTO, está llamando a todo lo que hay en el DTO, antes lo tenía así: {tmdbId: number; title: string; posterPath?: string; releaseDate?: string; overview?: string; status?: 'vista' | 'pendiente'; rating?: number;?: string;}
  ): Promise<UserMovie> {
    // 1. Buscar si ya existe una película con ese tmdbId.
    let movie = await this.movieRepo.findOne({
      where: { tmdbId: movieData.tmdbId },
    });

    // 2. Si no existe, la creamos con los campos que nos interesan.
    if (!movie) {
      movie = this.movieRepo.create({
        tmdbId: movieData.tmdbId,
        title: movieData.title,
        overview: movieData.overview,
        posterPath: movieData.posterPath, // camelCase porque así se indica en la entidad.
        releaseDate: movieData.releaseDate,
      });
      await this.movieRepo.save(movie);
    }

    // 3. Creamos la relación con el usuario en la tabla intermedia.
    const newEntry = this.userMovieRepo.create({
      user,
      movie,
      status: movieData.status || 'pendiente', // Si no se especifica, lo dejamos como "pendiente" por defecto.
      rating: movieData.rating, // Leemos estos datos del movieData para retornarlos.
      notes: movieData.notes,
    });

    // 4. Guardamos la relación en la base de datos.
    return await this.userMovieRepo.save(newEntry);
  }

  // Devuelve todas las películas de un usuario, opcionalmente filtrando por estado.
  async getUserMovies(userId: number, status?: 'vista' | 'pendiente') {
    const where = status
      ? { user: { id: userId }, status }
      : { user: { id: userId } };

    return await this.userMovieRepo.find({ where });
  }

  // Borra una entrada de la lista del usuario.
  async removeMovieFromList(id: number): Promise<void> {
    await this.userMovieRepo.delete(id);
  }

  // Actualiza el estado (vista / pendiente) de una entrada.
  async updateStatus(id: number, status: 'vista' | 'pendiente') {
    await this.userMovieRepo.update(id, { status });
  }

  async update(id: number, dto: UpdateUserMoviesDto): Promise<UserMovie> { // Para el método PATCH y el DTO de modificación de rating y notes.
    const userMovie = await this.userMovieRepo.findOneBy({ id });
    if (!userMovie) {
      throw new NotFoundException('Entrada no encontrada');
    }

    Object.assign(userMovie, dto); // Copia de valores de DTO.
    return this.userMovieRepo.save(userMovie); // Guarda cambios.
  }
}