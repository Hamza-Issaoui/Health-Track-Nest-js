import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNutrientDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly description: string;

  @IsNotEmpty()
  readonly mealId : number;
}
