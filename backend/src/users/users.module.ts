import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // En los módulos debemos importar el TypeOrm y la entidad.
import { User } from './user.entity';
import { UsersService } from './users.service'; // Aquí se importa el servicio.
import { UsersController } from './users.controller';

@Module({
  imports: [
    // En la propiedad "imports" se importan los módulos que el módulo actual necesita. Y usamos la función "forFeature" para registrar la entidad User en el contexto de este módulo.
    TypeOrmModule.forFeature([User]), // Esto le dice a TypeORM que el módulo actual está relacionado con la entidad User. Si hay más, se añaden más en el array.
  ],
  controllers: [UsersController],
  providers: [UsersService], // Aquí se registra el servicio en el módulo.
  exports: [UsersService],
})
export class UsersModule {} // Se exporta la clase UsersModule para que pueda ser usada en otras partes de la aplicación.
