import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class HealthPrograms extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  // many to one relation
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  user: Types.ObjectId;
 
}

export const HealthProgramSchema = SchemaFactory.createForClass(HealthPrograms);
