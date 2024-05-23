import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { MedicationSchema } from './medication.entity';
import { DatabaseModule } from '../shared/database/databse.module';
import { MedicalModule } from '../suivi-medical/medical.module';

@Module({
  imports: [
    DatabaseModule,
    MedicalModule,
    MongooseModule.forFeature([{ name: 'Medications', schema: MedicationSchema }]),
  ],
  providers: [MedicationService],
  controllers: [MedicationController],
  exports: [MongooseModule]
})
export class MedicationModule { }
