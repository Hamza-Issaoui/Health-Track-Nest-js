import { Type } from 'class-transformer';
import { ArrayMinSize, IsDate, IsIn, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { CreateNutrientDto } from 'src/app/nutrient/dto/create-nutrient.dto';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  totalCalories: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['breakfast', 'dinner', 'lunch', 'snack'])
  mealType: string;

  @IsString()
  notes?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateNutrientDto)
  @ArrayMinSize(1)
  readonly nutrients: CreateNutrientDto[];
}
