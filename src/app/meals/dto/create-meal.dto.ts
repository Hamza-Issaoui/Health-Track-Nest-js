import { Type } from 'class-transformer';
import { ArrayMinSize, IsDate, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

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
  @IsIn(['Breakfast', 'Dinner', 'Lunch', 'Snack'])
  mealType: string;

  @IsString()
  notes?: string;

  // many to one relation
  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;

  // one to many relation
  @ValidateNested({ each: true })
  @Type(() => CreateNutrientDto)
  @ArrayMinSize(1)
  readonly nutrients: CreateNutrientDto[];
}
