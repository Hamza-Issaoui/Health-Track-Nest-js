// auth.controller.ts
import { Controller, Post, UseGuards, Request, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/ForgotPassword.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';
import { VerifyEmailDto } from './dto/VerifyEmail.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {     
    const { name, password } = loginDto;
    return this.authService.login(name, password);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    return this.authService.register(name, email, password);
}

@Post('forgot-password')
async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  const { email } = forgotPasswordDto;
  try {
    await this.authService.forgotPassword(email);
    return { message: 'Password reset email sent successfully' };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException('User not found');
    }
    throw error;
  }
}

@Post('reset-password')
async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  const { token, newPassword } = resetPasswordDto;
  try {
    await this.authService.resetPassword(token, newPassword);
    return { message: 'Password reset successfully' };
  } catch (error) {
    throw error;
  }
}

@Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    const { email } = verifyEmailDto;
    try {
      await this.authService.verifyEmail(email);
      return { message: 'Email verified successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }
}
