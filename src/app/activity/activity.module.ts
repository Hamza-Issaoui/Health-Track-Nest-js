import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Activities, ActivitySchema } from './activity.entity';
import { ActivityService } from './activity.service';
import { ActivitiesController } from './activity.controller.';
import { DatabaseModule } from '../shared/database/databse.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    MongooseModule.forFeature([{ name: Activities.name, schema: ActivitySchema }]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivityService],
})
export class ActivityModule { }
