import { IsString, MinLength } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly description: string;
}
