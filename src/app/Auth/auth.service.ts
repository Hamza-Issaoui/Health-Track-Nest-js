import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

import { Users } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MyMailerService } from '../shared/mailer/mailer.service';


const RefreshTokens: { [key: string]: string } = {};

@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UserService,
    @InjectModel('Users') private readonly userModel: Model<Users>,
    private jwtService: JwtService,
    private mailerService: MyMailerService,
  ) { }

  async validateUser(email: string, password: string): Promise<Users | null> {
    try {
      const user = await this.usersService.findByEmail(email);
      console.log("user", user);
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async register(createUserDto: CreateUserDto, file): Promise<any> {
    try {
      const { password, ...userData } = createUserDto;
      const hashedPassword = bcrypt.hashSync(password, 10);
      await this.usersService.createUser({ ...userData, password: hashedPassword }, file);
      return {
        status: HttpStatus.CREATED,
        msg: "User Created Successfully!"
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException("Email not found", HttpStatus.BAD_REQUEST);
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      throw new UnauthorizedException('Incorrect password!');
    }

    const token = this.jwtService.sign({ email: user.email, sub: user.id });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return {
      email: user.email,
      user: user,
      token: token,
      expiresIn: 1,
      refreshToken: refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    if (refreshToken in RefreshTokens) {
      const token = this.jwtService.sign({ user: RefreshTokens[refreshToken] }, { expiresIn: '7d' });
      const newRefreshToken = jwt.sign({ id: RefreshTokens[refreshToken] }, process.env.JWT_SECRET, { expiresIn: '7d' });
      RefreshTokens[newRefreshToken] = RefreshTokens[refreshToken];
      delete RefreshTokens[refreshToken];
      return {
        accesstoken: token,
        refreshToken: newRefreshToken,
      };
    } else {
      throw new HttpException("Refresh token not found !", HttpStatus.BAD_REQUEST);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException("User not found !", HttpStatus.BAD_REQUEST);
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
      throw new HttpException("User not found !", HttpStatus.BAD_REQUEST);
    }
    await this.usersService.updateEmailVerificationStatus(user.id, true);
    // Mettez en œuvre toute autre logique de vérification nécessaire
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
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
