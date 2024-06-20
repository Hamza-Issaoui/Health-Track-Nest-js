import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { DatabaseModule } from '../shared/database/databse.module';
import { UserModule } from '../users/user.module';
import { HealthProgramSchema, HealthPrograms } from './healthProg.entity';
import { HealthProgramController } from './healthProg.controller';
import { HealthProgramService } from './healthProg.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    MongooseModule.forFeature([{ name: HealthPrograms.name, schema: HealthProgramSchema }]),
  ],
  controllers: [HealthProgramController],
  providers: [HealthProgramService],
  exports: [MongooseModule],
})
export class HealthProgramModule { }
