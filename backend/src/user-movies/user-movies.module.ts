import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMovie } from './user-movie.entity';
import { UserMoviesService } from './user-movies.service';
import { UserMoviesController } from './user-movies.controller';
import { UsersModule } from '../users/users.module';
import { Movie } from '../movies/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserMovie, Movie]),
    UsersModule,
  ],
  providers: [UserMoviesService],
  controllers: [UserMoviesController],
})
export class UserMoviesModule {}
