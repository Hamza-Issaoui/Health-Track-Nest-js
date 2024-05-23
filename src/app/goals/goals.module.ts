import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GoalsController } from './goals.controller';
import { GoalSchema } from './goals.entity';
import { GoalService } from './goals.service';
import { DatabaseModule } from '../shared/database/databse.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Goals', schema: GoalSchema }]),
  ],
  controllers: [GoalsController],
  providers: [GoalService],
})
export class GoalModule { }
