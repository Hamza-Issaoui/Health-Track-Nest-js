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
import { UploadFileService } from '../upload-file/upload-file.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', 
      signOptions: { expiresIn: '1d' }, 
       }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, LocalStrategy, MyMailerService, UploadFileService],
})
export class UserModule {}
