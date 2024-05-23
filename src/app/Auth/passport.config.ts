import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../users/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, LocalStrategy],
})
export class PassportConfigModule { }
