import { Controller, Post, Body, Get, Param, Delete, Put, Patch, Req, UseGuards } from '@nestjs/common';
import { UserMoviesService } from './user-movies.service';
import { UsersService } from '../users/users.service';
import { UserMoviesDto } from './dto/user-movies.dto';
import { UpdateUserMoviesDto } from './dto/update-user-movies.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-movies')
export class UserMoviesController {
  constructor(
    private readonly userMoviesService: UserMoviesService,
    private readonly usersService: UsersService,
  ) {}

  @Post(':userId')
  async add(
    @Param('userId') userId: number,
    @Body() body: UserMoviesDto, // Al crear el DTO, también modificamos esta parte, antes estaba así: // Este apartado, el movieData, se cambia al crear el DTO, está llamando a todo lo que hay en el DTO, antes lo tenía así: {tmdbId: number; title: string; posterPath?: string; releaseDate?: string; overview?: string; status?: 'vista' | 'pendiente'; rating?: number;?: string;}
  ) {
    const user = await this.usersService.findUserById(userId);
    if (!user) throw new Error('Usuario no encontrado'); // Hacemos una comprobación antes, porque el método de arriba puede devolver null.
    return this.userMoviesService.addMovieToList(user, body);
  }

  @Get(':userId')
  getAll(@Param('userId') userId: number) {
    return this.userMoviesService.getUserMovies(userId);
  }

  @UseGuards(AuthGuard('jwt')) 
  @Get('me')
  getMyMovies(@Req() req: any) { 
    return this.userMoviesService.getUserMovies(req.user.id);
  }

  @UseGuards(AuthGuard('jwt')) // Protege esta ruta con AuthGuard.
  @Get(':userId/:status')
  getUserMovies(
    @Param('userId') userId: string,
    @Param('status') status: 'vista' | 'pendiente',
    @Req() req: any,
  ) {
    const resolvedUserId = userId === 'me' ? req.user.id : parseInt(userId, 10); // El "me" es para que lo acepte el front, básicamente se refiere al id que se usa en ese momento, sin especificar.
    return this.userMoviesService.getUserMovies(resolvedUserId, status);
  } 

  @Put(':id/status')
  updateStatus(@Param('id') id: number, @Body() body: { status: 'vista' | 'pendiente' }) {
    return this.userMoviesService.updateStatus(id, body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userMoviesService.removeMovieFromList(id);
  }

  @Patch(':id') // Usamos el nuevo DTO parcial.
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserMoviesDto,
  ) {
    return this.userMoviesService.update(+id, updateDto);
  }
}
