import { IsNotEmpty, IsString, IsNumber, IsMongoId, IsOptional } from 'class-validator';

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

  @IsMongoId()
  @IsNotEmpty()
  readonly mealId: string;
}
