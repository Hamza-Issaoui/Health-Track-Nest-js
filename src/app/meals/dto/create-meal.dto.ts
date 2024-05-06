import { IsString, MinLength } from 'class-validator';

export class CreateMealDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly description: string;
}
