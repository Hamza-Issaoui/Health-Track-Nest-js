// login.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
