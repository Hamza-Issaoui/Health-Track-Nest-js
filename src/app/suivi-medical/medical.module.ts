import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from '../shared/database/databse.module';
import { MedicalSchema } from './medical.entity';
import { MedicalController } from './medical.controller';
import { MedicalService } from './medical.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Medical', schema: MedicalSchema }]),
  ],
  controllers: [MedicalController],
  providers: [MedicalService],
  exports: [MongooseModule]
})
export class MedicalModule { }
