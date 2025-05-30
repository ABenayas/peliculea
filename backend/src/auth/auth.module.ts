import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    UsersModule, // Importamos módulo de usuarios para poder consultarlos desde AuthService.
    PassportModule, // Habilita uso de estrategias (como JWT).
    JwtModule.register({
      // Registramos el módulo JWT.
      secret: process.env.JWT_SECRET, // Clave secreta desde .env para firmar y verificar tokens.
      signOptions: { expiresIn: '1h' }, // Este es el tiempo que tarda el token en caducar. No tiene mucho sentido si no se asocia a inactividad.
    }),
  ],
  providers: [AuthService, JwtStrategy], // // Incluimos la estrategia JWT y el servicio de auth.
  controllers: [AuthController], // Incluimos el controlador con los endpoints (login y profile).
})
export class AuthModule {}
