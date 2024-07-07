import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Messages extends Document {

  @Prop({ required: true })
  value: string;

  @Prop({ required: false, default: false })
  seen: boolean;
 

  @Prop({ type: Types.ObjectId, ref: 'Chat', required: true })
  chatId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  contactId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  isMine: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Messages);
