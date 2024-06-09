
import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly phone: number;

  @IsString()
  @IsIn(['Admin', 'Client', 'Coach'])
  readonly role: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  readonly file: string;
}
