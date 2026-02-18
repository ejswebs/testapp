import { IsNumber, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsIn(['ingreso', 'gasto'])
  type: 'ingreso' | 'gasto';

  @IsString()
  date: string; // Formato YYYY-MM-DD

  @IsOptional()
  @IsString()
  note?: string;

  @IsNumber()
  categoryId: number; // El ID del rubro que seleccionó el usuario
}