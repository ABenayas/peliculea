import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import './users/user.entity';
import './movies/movie.entity';
import './user-movies/user-movie.entity';
import * as dotenv from 'dotenv'; // main es el punto de entrada del proyecto, así que, cargo ya .env aquí.

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ // Con esto evitamos que entren datos mal formateados en cualquier endpoint que use DTO. Se añade despuésde crear los DTO. whitelist limpia datos extra automáticamente.
     whitelist: true, // Elimina del body cualquier propiedad que no esté en el DTO.
      forbidNonWhitelisted: true, // Lanza un error si llega una propiedad que no está permitida.
     }));

  app.enableCors(); // Esta línea la dejamos así durante desarrollo, pero más adelante, se pueden restringir dominios en producción.
  
  await app.listen(process.env.PORT ?? 3000); // Arranca, usa la variable de entorno o puerto 3000 por defecto.
}
bootstrap();
