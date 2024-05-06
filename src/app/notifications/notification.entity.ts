// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notifications extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

}

export const NotificationSchema = SchemaFactory.createForClass(Notifications);
