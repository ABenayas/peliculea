import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi_jwt_secreto', 
      signOptions: { expiresIn: '1h' }, // Este es el tiempo que tarda el token en caducar. No tiene mucho sentido si no se asocia a inactividad.
    }),
  ],
  providers: [AuthService, JwtStrategy], // Añadimos la estrategia.
  controllers: [AuthController],
})
export class AuthModule {}
