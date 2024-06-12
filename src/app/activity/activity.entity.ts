import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Activities extends Document {

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  caloriesBurned: number;

  @Prop()
  location?: string;

  @Prop()
  notes?: string;

  @Prop({ enum: ['Low', 'Moderate', 'High'] })
  intensity?: string;

  // many to one relation
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  user: Types.ObjectId;
}

export const ActivitySchema = SchemaFactory.createForClass(Activities);
