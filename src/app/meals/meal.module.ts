import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MealsController } from './meal.controller';
import { MealService } from './meal.service';
import { MealSchema } from './meal.entity';
import { DatabaseModule } from '../shared/database/databse.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Meals', schema: MealSchema }]),
  ],
  controllers: [MealsController],
  providers: [MealService],
  exports: [MongooseModule],
})
export class MealModule { }
