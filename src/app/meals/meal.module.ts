import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/databse.module';
import { MealsController } from './meal.controller';
import { MealService } from './meal.service';
import { MealSchema } from './meal.entity';




@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Meals', schema: MealSchema}]),
  ],
  controllers: [MealsController],
  providers: [MealService],
})
export class MealModule {}
