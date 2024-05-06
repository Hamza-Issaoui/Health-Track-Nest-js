import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/databse.module';
import { GoalsController } from './goals.controller';
import { GoalSchema } from './goals.entity';
import { GoalService } from './goals.service';




@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Goals', schema: GoalSchema}]),
  ],
  controllers: [GoalsController],
  providers: [GoalService],
})
export class GoalModule {}
