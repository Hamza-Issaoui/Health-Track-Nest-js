import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { DatabaseModule } from '../shared/database/databse.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.entity';
import { LocalStrategy } from '../Auth/local.strategy';
import { AuthService } from '../Auth/auth.service';
import { AuthController } from '../Auth/auth.controller';
import { MyMailerService } from '../shared/mailer/mailer.service';
import { UploadFileService } from '../shared/upload-file/upload-file.service';

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
  exports: [UserService],
})
export class UserModule {}
