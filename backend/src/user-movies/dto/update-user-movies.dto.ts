import { IsInt, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateUserMoviesDto { // Este DTO es exclusivamente para modificar rating y notes.
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
