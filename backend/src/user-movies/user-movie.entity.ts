import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Movie } from '../movies/movie.entity';
  
  @Entity()
  export class UserMovie {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.userMovies, { eager: true }) // eager se usa en relaciones ManyTo... Cuando se hace una consulta, te trae también el dato relacionado automáticamente. Sin "eager: true", tendría que hacer una consulta extra para traer al usuario.
    user: User;
  
    @ManyToOne(() => Movie, (movie) => movie.userMovies, { eager: true })
    movie: Movie;
  
    @Column({ default: 'pending' }) // 'pending' | 'watched'
    status: string;
  
    @Column({ type: 'int', nullable: true }) // nullable es para que sean campos opcionables.
    rating: number;

    @Column({ type: 'text', nullable: true }) 
    notes: string;
  
    @CreateDateColumn() // Es un decorador de TypeOrm que genera automáticamente la fecha de creación del registro.
    addedAt: Date;
  }
  