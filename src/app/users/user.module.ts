import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/databse.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.entity';
import { LocalStrategy } from '../Auth/local.strategy';
import { AuthService } from '../Auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../Auth/auth.controller';
import { MyMailerService } from '../Auth/mailer/mailer.service';
//import { MyMailerModule } from '../Auth/mailer/mailer.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Provide your secret key here
      signOptions: { expiresIn: '1d' }, // Set token expiration
       }),
    //MyMailerModule,
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, LocalStrategy, MyMailerService],
})
export class UserModule {}
