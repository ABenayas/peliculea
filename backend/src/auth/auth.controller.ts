import { Controller,
  Post, 
  Body, 
  UnauthorizedException, 
  Get, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { AuthService } from './auth.service'; // Servicio que contiene la lógica de login y generación del token.
import { JwtAuthGuard } from './jwt-auth.guard'; // Guard para proteger rutas privadas usando JWT.

@Controller('auth') // // Agrupa todas las rutas bajo /auth.
export class AuthController {
  constructor(private authService: AuthService) {}

  // Ruta POST /auth/login: recibe email y password, y devuelve el token si son válidos.
  @Post('login') // Aún no está protegido, ya que no tiene token todavía.
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.login(body.email, body.password); // El método login encuentra por email, devuelve un JWT firmado, el Frontend lo guarda en localStorage y lo manda en cada petición con Authorization: Bearer.

    if (!user) { // Si no se encontró usuario o la contraseña es incorrecta.
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return user; // Si el login es correcto, devolvemos el token y los datos públicos del usuario.
  }

  // Ruta GET /auth/profile protegida por JWT (con el token enviado en headers).
  @UseGuards(JwtAuthGuard)
  @Get('profile') // profile ya está protegido con token, generado por la clase AuthService.
  getProfile(@Request() req) {
    return req.user; // req.user es inyectado automáticamente por JwtStrategy.validate() Es un objeto que contiene los datos del usuario extraídos del token JWT.
  } // Devuelve los datos del usuario actual.

}
