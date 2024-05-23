import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActivitySchema } from './activity.entity';
import { ActivityService } from './activity.service';
import { ActivitiesController } from './activity.controller.';
import { DatabaseModule } from '../shared/database/databse.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Activities', schema: ActivitySchema }]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivityService],
})
export class ActivityModule { }
