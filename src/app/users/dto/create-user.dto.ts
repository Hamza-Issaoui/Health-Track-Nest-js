// create-user.dto.ts

import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly phone: number;

  @IsString()
  @IsIn(['admin', 'client', 'coach'])
  readonly role: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
