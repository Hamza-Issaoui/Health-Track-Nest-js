import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notifications extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  // @Prop({ required: true })
  // read: string;

  // @Prop({ required: true, enum: ['info', 'warninig', 'error'] })
  // type: string;

}

export const NotificationSchema = SchemaFactory.createForClass(Notifications);
