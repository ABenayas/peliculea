import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Movie } from './movies/movie.entity';
import { UserMovie } from './user-movies/user-movie.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({ // Esto es el motor que TypeORM necesita para hacer migraciones.
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost', // Indicamos el nombre del servicio que conecta con Postgres, nestjs-database, el cual se indica en docker-compose.
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'default',
  entities: ['dist/**/*.entity.js'], // Para usar desde dist
  migrations: ['dist/migrations/*.js'], // Para usar desde dist
  synchronize: false, // Siempre en false para migraciones.
});


