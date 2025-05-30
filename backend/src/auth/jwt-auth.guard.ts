import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Importamos el guard de Passport.

@Injectable()
// Esto comprueba que el token es válido y lo añadimos en los controladores correspondientes. Si el token es válido, Nest lo decodifica y lo añade a req.user (este objeto contiene el payload del token).
// Creamos un guard que usa la estrategia 'jwt' previamente registrada.
// Esto protegerá rutas privadas, validando el token recibido en la cabecera Authorization.
export class JwtAuthGuard extends AuthGuard('jwt') {}
