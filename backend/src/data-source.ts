import { DataSource } from 'typeorm'; // Importa el motor de conexión principal que TypeORM necesita para interactuar con la base de datos y gestionar migraciones.
import * as dotenv from 'dotenv';

// Se realiza consulta a ChatGPT por problemas a la hora de realizar las migraciones. Se añaden las líneas 13, 14 y 15 del archivo package.json. (ChatGPT, s.f.)
// Se visualiza un vídeo de YouTube para la resolución de migraciones. (YouTube, s.f.)
// Tembién se recurre a documentación oficial para crear este archivo, pero no es suficiente para solventar incidencias. (TypeORM, s.f.)

dotenv.config();// Carga el archivo .env desde la ruta correcta.

export const AppDataSource = new DataSource({ // Esto es el motor que TypeORM necesita para hacer migraciones. Exporta una nueva instancia de DataSource, que es la configuración base que TypeORM usará para conectarse a la base de datos y ejecutar migraciones.
  type: 'postgres', // Especificamos que el motor de base de datos usado es PostgreSQL.
  host: process.env.POSTGRES_HOST, // Indicamos el nombre del servicio que conecta con Postgres, el cual se indica en docker-compose.
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'], // Indica dónde buscar las entidades ya compiladas (en JavaScript dentro de /dist) para que TypeORM las registre al generar o ejecutar migraciones.
  migrations: ['dist/migrations/*.js'], // Indica la carpeta donde buscar los archivos .js de migraciones compiladas.
  synchronize: false, // Siempre en false para migraciones, evita que TypeORM sincronice automáticamente los esquemas de la base de datos. Las migraciones se encargan de esto de forma controlada.
});



