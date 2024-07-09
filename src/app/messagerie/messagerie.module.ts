import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { WebSocket } from '../shared/webSocket/notification-websocket';
import { DatabaseModule } from '../shared/database/databse.module';
import { MessageSchema, Messages } from './messagerie.entity';
import { MessageController } from './messagerie.controller';
import { MessageService } from './messagerie.service';
import { ChatModule } from '../chat/chat.module';
import { MessagerieGateway } from '../shared/webSocket/messegerie-websocket';

@Module({
  imports: [
    DatabaseModule,
    ChatModule,
    MongooseModule.forFeature([{ name: Messages.name, schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService, WebSocket, MessagerieGateway],
  exports: [MongooseModule],
})
export class MessagerieModule { }
