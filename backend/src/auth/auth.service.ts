import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'; // Añadimos JwtService.

@Injectable()
export class AuthService {
  // Inyectamos JwtService.
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // Creamos el payload con la info que irá en el token.
    const payload = { sub: user.id, email: user.email, name: user.name };

    // Generamos el token JWT.
    const access_token = this.jwtService.sign(payload);

    // Devolvemos el token al frontend.
    return { access_token };
  }
}
