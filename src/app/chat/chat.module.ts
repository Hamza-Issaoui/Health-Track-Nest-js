import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { WebSocket } from '../shared/webSocket/notification-websocket';
import { DatabaseModule } from '../shared/database/databse.module';
import { Chat, ChatSchema } from './chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../users/user.module';
import { MessagerieGateway } from '../shared/webSocket/messegerie-websocket';
 

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService, MessagerieGateway ],
  exports: [MongooseModule],
})
export class ChatModule { }
