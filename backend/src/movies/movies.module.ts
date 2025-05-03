import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({ // Si se genera este archivo por consola, carga automáticamentes estos dos módulos. Y, como siempre, exportamos a app.module.ts.
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
