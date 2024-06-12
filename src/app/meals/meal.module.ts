import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MealsController } from './meal.controller';
import { MealService } from './meal.service';
import { MealSchema, Meals } from './meal.entity';
import { DatabaseModule } from '../shared/database/databse.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    MongooseModule.forFeature([{ name: Meals.name, schema: MealSchema }]),
  ],
  controllers: [MealsController],
  providers: [MealService],
  exports: [MongooseModule],
})
export class MealModule { }
