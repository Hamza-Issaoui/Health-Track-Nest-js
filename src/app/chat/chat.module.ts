import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { WebSocket } from '../shared/webSocket/webSocketGateway';
import { DatabaseModule } from '../shared/database/databse.module';
import { Chat, ChatSchema } from './chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../users/user.module';
 

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService ],
  exports: [MongooseModule],
})
export class ChatModule { }
