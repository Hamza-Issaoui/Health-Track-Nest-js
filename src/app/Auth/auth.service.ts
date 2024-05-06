import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Users } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { MyMailerService } from './mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mailerService: MyMailerService, 

  ) {}

  async validateUser(name: string, password: string): Promise<Users| null> {
    try {
      const user = await this.usersService.findByUsername(name);
      console.log("user",user);
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(name: string, password: string): Promise<any> {
    try {
      const user = await this.validateUser(name, password);
      console.log("user",user);
      
      if (!user) {
        throw new UnauthorizedException('User not found or invalid password !');
      }
      const payload = { name: user.name, sub: user.id};
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to Login !');
    }
  }

  async register(name: string, email: string, password: string): Promise<any> {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      return this.usersService.createUser(name, email, hashedPassword);
    } catch (error) {
      // Handle error appropriately
      throw new Error('Failed to register user');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
        throw new NotFoundException('User not found');
    }

    // Generate a reset token 
    const resetToken = this.generateResetToken();

    // Update the reset token for the user
    await this.usersService.updateResetToken(user.id, resetToken);

    // Send the forgot password email
    await this.mailerService.sendForgotPasswordEmail(email, resetToken);
}


  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await this.usersService.updatePassword(user.id, hashedPassword);
    // Optionally, invalidate the reset token after use
    await this.usersService.clearResetToken(user.id);
  }

  private generateResetToken(): string {
    const tokenLength = 16; // Define the length of the reset token
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }

  async verifyEmail(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersService.updateEmailVerificationStatus(user.id, true);
    // Mettez en œuvre toute autre logique de vérification nécessaire
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService, // Inject UserService here
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key',
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.validateUser(payload.name, '');
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
