import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/databse.module';
import { ActivitySchema } from './activity.entity';
import { ActivityService } from './activity.service';
import { ActivitiesController } from './activity.controller.';


@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Activities', schema: ActivitySchema}]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivityService],
})
export class ActivityModule {}
