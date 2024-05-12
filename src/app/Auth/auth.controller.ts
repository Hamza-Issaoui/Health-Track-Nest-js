// auth.controller.ts
import { Controller, Post, UseGuards, Request, Body, NotFoundException, UnauthorizedException, HttpStatus, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ForgotPasswordDto } from './dto/ForgotPassword.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';
import { VerifyEmailDto } from './dto/VerifyEmail.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 // @UseGuards(LocalAuthGuard)
 @Post('register')
 @UseInterceptors(FileInterceptor('file')) // 'file' is the name of the field in the form-data
 async register(@Body() createUserDto: CreateUserDto, @UploadedFile() file) {
   return this.authService.register(createUserDto, file);
 }

 @Post('login')
 async logIn(@Body() body: any, @Res() res: any): Promise<void> {
   try {
     const result = await this.authService.login(body.email, body.password);
     res.status(HttpStatus.OK).json({ ...result, msg: "you are connected", success: true });
   } catch (error) {
     res.status(HttpStatus.NOT_ACCEPTABLE).json({ msg: error.message });
   }
 }

 @Post('refresh-token')
 async refreshToken(@Body() body: any, @Res() res: any): Promise<void> {
   try {
     const result = await this.authService.refreshToken(body.refreshToken);
     res.status(HttpStatus.OK).json(result);
   } catch (error) {
     res.status(HttpStatus.NOT_ACCEPTABLE).json({ msg: error.message });
   }
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
