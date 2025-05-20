import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Carga el archivo .env desde la ruta correcta
dotenv.config();

export const AppDataSource = new DataSource({ // Esto es el motor que TypeORM necesita para hacer migraciones.
  type: 'postgres',
  host: process.env.POSTGRES_HOST, // Indicamos el nombre del servicio que conecta con Postgres, el cual se indica en docker-compose.
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'], // Para usar desde dist.
  migrations: ['dist/migrations/*.js'], // Para usar desde dist.
  synchronize: false, // Siempre en false para migraciones.
});



