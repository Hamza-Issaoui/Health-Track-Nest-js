import { IsNotEmpty, IsNumber, IsOptional, IsString, IsMongoId } from 'class-validator';

export class CreateNutrientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsNumber()
  calories?: number;

  @IsNotEmpty()
  @IsMongoId()
  mealId: string; 
}
