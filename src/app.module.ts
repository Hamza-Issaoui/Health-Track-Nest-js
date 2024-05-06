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

@Module({
  imports: [UserModule, NotificationModule, GoalModule, MealModule, NutrientModule, ActivityModule, MedicalModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
