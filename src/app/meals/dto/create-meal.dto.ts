import { Type } from 'class-transformer';
import { ArrayMinSize, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateNutrientDto } from 'src/app/nutrient/dto/create-ntrient.dto';

export class CreateMealDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly description: string;

  @ValidateNested({ each: true })
  @Type(() => CreateNutrientDto)
  @ArrayMinSize(1)
  readonly nutrients: CreateNutrientDto[];
}
