import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async search(@Query('query') query: string) { // Aquí recojo el nombre de película que buscaré. Este query viene de, por ejemplo, "URL: http://localhost:3000/movies/search?query=inception"
    return await this.moviesService.searchMovies(query);
  }

  @Get(':id')
  getDetails(@Param('id') id: string) {
    return this.moviesService.getMovieDetails(id);
  }
}
