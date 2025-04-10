import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({ // Si generas este archivo por consola, te carga automáticamentes estos dos módulos. Y, como siempre, exportamos a app.module.ts.
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
