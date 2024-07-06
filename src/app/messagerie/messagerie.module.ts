import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { WebSocket } from '../shared/webSocket/webSocketGateway';
import { DatabaseModule } from '../shared/database/databse.module';
import { MessageSchema } from './messagerie.entity';
import { MessageController } from './messagerie.controller';
import { MessageService } from './messagerie.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Messages', schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService, WebSocket],
})
export class MessagerieModule { }
