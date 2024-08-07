import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './app/users/user.module';
import { NotificationModule } from './app/notifications/notification.module';
import { MealModule } from './app/meals/meal.module';
import { GoalModule } from './app/goals/goals.module';
import { NutrientModule } from './app/nutrient/nutrient.module';
import { ActivityModule } from './app/activity/activity.module';
import { MedicalModule } from './app/suivi-medical/medical.module';
import { AllergyModule } from './app/allergy/allergy.module';
import { SymptomModule } from './app/symptom/symptom.module';
import { MedicationModule } from './app/medication/medication.module';
import { AppointmentModule } from './app/appointment/appointment.module';
import { UploadFileService } from './app/shared/upload-file/upload-file.service';
import { HealthProgramModule } from './app/healthProgram/healthProg.module';
import { MessagerieModule } from './app/messagerie/messagerie.module';
import { ChatModule } from './app/chat/chat.module';

@Module({
  imports: [
    UserModule,
    NotificationModule,
    GoalModule,
    MealModule,
    NutrientModule,
    ActivityModule,
    MedicalModule,
    AllergyModule,
    SymptomModule,
    MedicationModule,
    AppointmentModule,
    HealthProgramModule,
    MessagerieModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, UploadFileService],
})
export class AppModule { }
