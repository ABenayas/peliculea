import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
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

  async addMovieToList(
    user: User,
    movieData: UserMoviesDto,
  ): Promise<UserMovie> {
    let movie = await this.movieRepo.findOne({
      where: { tmdbId: movieData.tmdbId },
    });

    if (!movie) {
      movie = this.movieRepo.create({
        tmdbId: movieData.tmdbId,
        title: movieData.title,
        overview: movieData.overview,
        posterPath: movieData.posterPath,
        releaseDate: movieData.releaseDate,
      });
      await this.movieRepo.save(movie);
    }

    // 🔧 Comprobación de duplicado general (en cualquier lista del user)
    const existing = await this.userMovieRepo.findOne({
      where: {
        user: { id: user.id },
        movie: { id: movie.id },
      },
      relations: ['user', 'movie'],
    });

    if (existing) {
      throw new BadRequestException('La película ya está en tus listas');
    }

    const newEntry = this.userMovieRepo.create({
      user,
      movie,
      status: movieData.status || 'pendiente',
      rating: movieData.rating,
      notes: movieData.notes,
    });

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