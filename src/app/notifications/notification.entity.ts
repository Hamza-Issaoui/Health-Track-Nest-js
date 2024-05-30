import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notifications extends Document {

  @Prop({ required: false })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: false, enum: ['info', 'warning', 'alert'] })
  type: string;

  @Prop({ required: false, default: false })
  read: boolean;

  @Prop({ required: false, enum: ['low', 'medium', 'high'] })
  priority: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notifications);
