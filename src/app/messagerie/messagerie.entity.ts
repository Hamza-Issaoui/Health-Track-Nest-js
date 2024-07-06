import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Messages extends Document {

  @Prop({ required: true })
  message: string;

  @Prop({ required: false, default: false })
  read: boolean;
 
}

export const MessageSchema = SchemaFactory.createForClass(Messages);
