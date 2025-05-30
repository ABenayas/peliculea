import { Injectable } from '@nestjs/common'; // Decorador que marca esta clase como inyectable por NestJS.
import { UsersService } from '../users/users.service'; // Importamos el servicio de usuarios para poder buscar por email.
import * as bcrypt from 'bcryptjs'; // Librería para comparar contraseñas cifradas.
import { JwtService } from '@nestjs/jwt'; // Añadimos JwtService. Servicio de Nest para firmar y generar tokens JWT.

// Hay que reseñar que para solucionar diversos problemas con JWT se recurrió a consulta con ChatGPT (OpenAI), lo cual implica a ciertas líneas, relacionadas con JWT, de archivos de esta carpeta, y del frontend, a Login.tsx y api.ts. (ChatGPT, s.f.)
// Ya que no sirvió con sólo consultar en la documentación oficial. (JWT, s.f.)
// Se indican ambas consultas en este archivo, ya que es el inicio del proceso de autenticación, donde se genera el token.
@Injectable()
export class AuthService {
  // Inyectamos el servicio de usuarios y el servicio de JWT.
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Método login que valida credenciales y devuelve un token si son correctas.
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email); // Buscamos el usuario por email.
    if (!user) return null; // Si no existe, devolvemos null.

    const isMatch = await bcrypt.compare(password, user.password); // Comparamos la contraseña sin cifrar con la cifrada en BD.
    if (!isMatch) return null; // Si no coincide, devolvemos null.

    // Creamos el payload con la info que irá en el token, irá dentro del JWT (JSON)
    const payload = { sub: user.id, email: user.email, name: user.name }; 

    // Firmamos el token con el secreto definido en el .env
    const access_token = this.jwtService.sign(payload); // AQUÍ SE CREA EL TOKEN, siempre que el método login se cumpla.

    // Devolvemos el token en un objeto, el frontend lo guardará en localStorage. En definitiva, se emvía al frontend.
    return { access_token };
  }
}
