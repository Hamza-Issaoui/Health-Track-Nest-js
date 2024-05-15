import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../shared/database/databse.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationSchema } from './notification.entity';
import { WebSocket } from '../shared/webSocket/webSocketGateway';



@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Notifications', schema: NotificationSchema}]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, WebSocket],
})
export class NotificationModule {}
