import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';


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
}

export const ActivitySchema = SchemaFactory.createForClass(Activities);
