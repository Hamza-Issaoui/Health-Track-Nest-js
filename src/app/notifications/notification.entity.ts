import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notifications extends Document {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, enum: ['Info', 'Warning', 'Alert'] })
  type: string;

  @Prop({ required: false, default: false })
  read: boolean;

  @Prop({ required: false, enum: ['Low', 'Medium', 'High'] })
  priority: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notifications);
