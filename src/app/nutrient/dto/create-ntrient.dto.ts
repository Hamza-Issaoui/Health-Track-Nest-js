import { IsNotEmpty, IsString, MinLength, IsMongoId } from 'class-validator';

export class CreateNutrientDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly description: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly mealId: string;
}
