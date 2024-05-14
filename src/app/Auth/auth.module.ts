// auth.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from "../users/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { Users, UserSchema } from "../users/user.entity"; // Import Users and UserSchema
import { MyMailerService } from '../shared/mailer/mailer.service'; // Import MyMailerService

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]), // Provide the Users model to AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, MyMailerService], // Include MyMailerService in providers array
})
export class AuthModule {}
