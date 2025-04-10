import { Injectable } from '@nestjs/common'; // Decorador de NestJS que marca la clase como inyectable en otros componentes.
import { InjectRepository } from '@nestjs/typeorm'; // Decorador para inyectar el repositorio de TypeORM.
import { Repository } from 'typeorm'; // Importa la clase Repository de TypeORM, que nos permite hacer consultas a la base de datos.
import { User } from './user.entity'; // Importa la entidad User que define la estructura de la tabla 'users' en la base de datos.
import * as bcrypt from 'bcryptjs';

@Injectable() // Este decorador hace que la clase sea gestionada por el contenedor de dependencias de NestJS, lo que permite inyectarla en otras partes de la aplicación.
export class UsersService {
  // Inyectamos el repositorio de la entidad 'User'. Esto nos da acceso a la base de datos para hacer consultas.
  constructor(
    @InjectRepository(User) // Este decorador inyecta el repositorio de la entidad User, permitiéndonos interactuar con la tabla de usuarios.
    private usersRepository: Repository<User>, // El repositorio de usuarios es utilizado para ejecutar operaciones CRUD en la base de datos.
  ) {}

  // Método para crear un nuevo usuario con la contraseña hasheada
  async createUser(body: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(body.password, 10); // Aquí se cifra, para que a la hora de hacer el login compare bien.
    const newUser = this.usersRepository.create({
      email: body.email,
      password: hashedPassword,
      name: body.name,
    });
    return await this.usersRepository.save(newUser);
  }

  // Método para obtener todos los usuarios.
  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.find(); // Utiliza el repositorio para recuperar todos los usuarios de la base de datos.
  }

  // Método para obtener un usuario por su ID.
  async findUserById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } }); // Busca un usuario por su ID.
    return user || null; // Devuelve el usuario encontrado o null si no existe.
  }

  // Método que uso para el login en ./auth/auth.service.ts
  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // Método para actualizar los datos de un usuario.
  async updateUser(
    id: number,
    email: string,
    name: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } }); // Busca el usuario por su ID.
    if (!user) {
      return null; // Si no se encuentra el usuario, devuelve null.
    }
    user.email = email; // Actualiza el correo electrónico del usuario.
    user.name = name;
    user.password = password; // Actualiza la contraseña del usuario.
    return await this.usersRepository.save(user); // Guarda los cambios en la base de datos.
  }

  // Método para eliminar un usuario por su ID.
  async deleteUser(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id); // Elimina el usuario por su ID.
    return result.affected ? result.affected > 0 : false; // Verifica si `affected` es válido antes de comparar.
  }
}
