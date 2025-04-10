import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Predefinido con este decorador.
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body: { email: string; name: string; password: string }) {
    return this.usersService.createUser(body);
  }

  @Get('/')
  getAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.findUserById(id);
  }

  @Put(':id') // PUT se usa para actualizar recursos completos.
  update(
    @Param('id') id: number,
    @Body() body: { email: string; name: string; password: string },
  ) {
    return this.usersService.updateUser(
      id,
      body.email,
      body.name,
      body.password,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
