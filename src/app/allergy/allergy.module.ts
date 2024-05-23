import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AllergyController } from './allergy.controller';
import { Allergy, AllergySchema } from './allergy.entity';
import { AllergyService } from './allergy.service';
import { DatabaseModule } from '../shared/database/databse.module';
import { MedicalModule } from '../suivi-medical/medical.module';

@Module({
  imports: [
    DatabaseModule,
    MedicalModule,
    MongooseModule.forFeature([{ name: Allergy.name, schema: AllergySchema }]),
  ],
  controllers: [AllergyController],
  providers: [AllergyService],
  exports: [MongooseModule]
})
export class AllergyModule { }
