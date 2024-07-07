import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { Messages } from '../messagerie/messagerie.entity';

@Schema({ timestamps: true })
export class Chat extends Document {

  @Prop({ required: true })
  lastMessage: string;

  @Prop({ required: false })
  unreadCount: Number;
 
  @Prop({ required: false, default: false })
  muted: boolean;

  @Prop({ required: true })
  lastMessageAt: Date;

   // many to one relation
   @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
   contactId: Types.ObjectId;
 
   @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
   idReceiver: Types.ObjectId;

   // one to many relation
   @Prop({ type: [{ type: Types.ObjectId, ref: 'Messages' }] })
   messages: Messages[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
