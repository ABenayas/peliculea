import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserMovie } from '../user-movies/user-movie.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tmdbId: number; // Id original de TMDb para luego poder pedir más info.

  @Column()
  title: string;

  @Column({ nullable: true }) // Le indicamos que puede ser null, vacío. Sería lo mismo que "overview TEXT NULL".
  overview: string;

  @Column({ nullable: true })
  posterPath: string;

  @Column({ nullable: true })
  releaseDate: string;

  @OneToMany(() => UserMovie, (userMovie) => userMovie.movie)
  userMovies: UserMovie[];
}
