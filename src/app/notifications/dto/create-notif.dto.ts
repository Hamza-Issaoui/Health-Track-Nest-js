import { IsString, MinLength } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly description: string;
}
