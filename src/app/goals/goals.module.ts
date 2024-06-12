import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GoalsController } from './goals.controller';
import { GoalSchema, Goals } from './goals.entity';
import { GoalService } from './goals.service';
import { DatabaseModule } from '../shared/database/databse.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    MongooseModule.forFeature([{ name: Goals.name, schema: GoalSchema }]),
  ],
  controllers: [GoalsController],
  providers: [GoalService],
})
export class GoalModule { }
