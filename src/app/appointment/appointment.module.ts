import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { DatabaseModule } from '../shared/database/databse.module';
import { AppointmentSchema } from './appointment.entity';
import { MedicalModule } from '../suivi-medical/medical.module';

@Module({
  imports: [
    DatabaseModule,
    MedicalModule,
    MongooseModule.forFeature([{ name: 'Appointments', schema: AppointmentSchema }]),
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  exports: [MongooseModule]
})
export class AppointmentModule { }
