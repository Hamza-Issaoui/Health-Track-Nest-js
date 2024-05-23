import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';
import { Symptom, SymptomSchema } from './symptom.entity';
import { DatabaseModule } from '../shared/database/databse.module';
import { MedicalModule } from '../suivi-medical/medical.module';

@Module({
  imports: [
    DatabaseModule,
    MedicalModule,
    MongooseModule.forFeature([{ name: Symptom.name, schema: SymptomSchema }]),
  ],
  providers: [SymptomService],
  controllers: [SymptomController],
  exports: [MongooseModule]
})
export class SymptomModule { }
