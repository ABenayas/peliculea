import { 
  IsInt, 
  IsOptional, 
  IsString, 
  IsIn, 
  IsNotEmpty,
 } from 'class-validator';

export class UserMoviesDto { // Con esto se evita que lleguen datos mal formateados desde el frontend o Postman. Sirve para insertar películas.
  @IsInt()
  tmdbId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  overview?: string;

  @IsOptional()
  @IsString()
  posterPath?: string;

  @IsOptional()
  @IsString()
  releaseDate?: string;

  @IsOptional()
  @IsIn(['vista', 'pendiente'])
  status?: 'vista' | 'pendiente';

  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
