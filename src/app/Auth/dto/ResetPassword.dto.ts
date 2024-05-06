// reset-password.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20) // Example validation: Password length between 6 and 20 characters
  newPassword: string;
}
