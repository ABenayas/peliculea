import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Importamos los decoradores necesarios de TypeORM para definir las columnas y la entidad.

@Entity() // Usamos el decorador @Entity() para indicar que esta clase será una tabla en la base de datos, una entidad.
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Con @PrimaryGeneratedColumn() le decimos a TypeOrm que es clave primaria y que el valor será generado automáticamente (autoincremental).

  @Column({ unique: true }) // El VARCHAR se genera con 255 caracteres por defecto, no hace falta indicarlo aquí.
  email: string; // @Column() marca esta propiedad como una columna en la tabla de base de datos. En este caso, además especificamos que el email debe ser único.

  @Column()
  name: string;

  @Column()
  password: string; // @Column() marca esta propiedad como una columna regular de la tabla.

  @CreateDateColumn()
  created_at: Date; // El campo "created_at" guarda la fecha en que se creó el registro del usuario.

  @UpdateDateColumn()
  updated_at: Date; // El campo "updated_at" guarda la fecha en que se actualizó por última vez el registro.
}
