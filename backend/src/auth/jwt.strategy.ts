import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Este es el punto clave de la autenticación JWT. Sin esto, el @UseGuards(JwtAuthGuard) en el AuthController no funcionaría. Esta estrategia es la que lee el token, lo verifica y devuelve el payload a req.user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // Extrae el token, lo valida con la clave del .env (JWT_SECRET) y mete los datos (id, email, name) en req.user.
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('❌ JWT_SECRET no está definido en .env');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization. Por tanto, DE AQUÍ SE EXTRAE EL TOKEN.
      ignoreExpiration: false, // Rechaza tokens expirados.
      secretOrKey: jwtSecret, // Clave para verificar que el token fue firmado por nosotros.
    });
  }

  async validate(payload: any) {
    // Los datos del token se insertan automáticamente en req.user, por tanto, contendrá, a modo de ejemplo:
    // {
    // sub: 1, 
    // email: 'lulo@peliculea.com',
    // name: 'Hamfri'
    // }
    // req.user es una propiedad que añade automáticamente Passport (a través del guard JwtAuthGuard) una vez que valida correctamente el token JWT.
    return { id: payload.sub, email: payload.email, name: payload.name };
  }
}

