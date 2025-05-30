import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Movie } from '../movies/movie.entity';
  
  // Se recurre a documentación oficial para crear esta entidad, sobre todo la relación (TypeORM, s.f.)
  @Entity()
  export class UserMovie {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.userMovies, { eager: true }) // eager se usa en relaciones ManyTo... Cuando se hace una consulta, te trae también el dato relacionado automáticamente. Sin "eager: true", tendría que hacer una consulta extra para traer al usuario.
    user: User;
  
    @ManyToOne(() => Movie, (movie) => movie.userMovies, { eager: true })
    movie: Movie;
  
    @Column({ default: 'pendiente' }) // 'pendiente' | 'vista'
    status: string;
  
    @Column({ type: 'int', nullable: true }) // nullable es para que sean campos opcionables.
    rating: number;

    @Column({ type: 'text', nullable: true }) 
    notes: string;
  
    @CreateDateColumn() // Es un decorador de TypeOrm que genera automáticamente la fecha de creación del registro.
    addedAt: Date;
  }
  