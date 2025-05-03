import { Controller, Post, Body, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { UserMoviesService } from './user-movies.service';
import { UsersService } from '../users/users.service';
import { UserMoviesDto } from './dto/user-movies.dto';

@Controller('user-movies')
export class UserMoviesController {
  constructor(
    private readonly userMoviesService: UserMoviesService,
    private readonly usersService: UsersService,
  ) {}

  @Post(':userId')
  async add(
    @Param('userId') userId: number,
    @Body() body: UserMoviesDto, // Al crear el DTO, también modificamos esta parte, antes estaba así: // Este apartado, el movieData, se cambia al crear el DTO, está llamando a todo lo que hay en el DTO, antes lo tenía así: {tmdbId: number; title: string; poster_path?: string; release_date?: string; overview?: string; status?: 'vista' | 'pendiente'; rating?: number;?: string;}
  ) {
    const user = await this.usersService.findUserById(userId);
    if (!user) throw new Error('Usuario no encontrado'); // Hacemos una comprobación antes, porque el método de arriba puede devolver null.
    return this.userMoviesService.addMovieToList(user, body);
  }

  @Get(':userId')
  getAll(@Param('userId') userId: number) {
    return this.userMoviesService.getUserMovies(userId);
  }

  @Get(':userId/:status')
  getByStatus(@Param('userId') userId: number, @Param('status') status: 'vista' | 'pendiente') {
    return this.userMoviesService.getUserMovies(userId, status);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: number, @Body() body: { status: 'vista' | 'pendiente' }) {
    return this.userMoviesService.updateStatus(id, body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userMoviesService.removeMovieFromList(id);
  }

  @Patch(':id') // Es para modificar los campos de rating y notes.
  update(
    @Param('id') id: string,
    @Body() updateDto: UserMoviesDto,
  ) {
    return this.userMoviesService.update(+id, updateDto);
  }
}
