import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { UserMoviesModule } from './user-movies/user-movies.module';
import { Movie } from './movies/movie.entity';
import { UserMovie } from './user-movies/user-movie.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'nestjs-database', // Tiene que coincidir con el servicio de docker-compose, el host si uso Docker, si no, localhost.
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'default',
      entities: [User, Movie, UserMovie], // Aquí metemos todas las entidades que tenemos. Aunque, parece que se puede hacer de manera automática así: 'dist/**/*.entity{.ts,.js}', si no, sería indicando las entidades una a una [User,...], e importándolas arriba.
      synchronize: false, // Aquí está la opción de no sincronizar automáticamente, false. Al principio lo dejo true.
      retryDelay: 3000, // Estas 2 líneas son para darle tiempo a que la base de datos se caliente, estos son los segundos, y abajo los intentos de conexión.
      retryAttempts: 10,
    }),
    UsersModule, // Este es el módulo de usuarios.
    AuthModule, // Este es el módulo de auth.
    MoviesModule, // Este es el módulo de movies, parece que lo exportó solo al crear carpetas por consola.
    UserMoviesModule,
  ], // Importamos los módulos que tengamos.
  controllers: [],
  providers: [],
})
export class AppModule {} // Desde  aquí se exportan los módulos donde hagan falta.
