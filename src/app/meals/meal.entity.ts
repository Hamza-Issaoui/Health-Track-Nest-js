import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

import { Nutrients } from '../nutrient/nutrient.entity';


@Schema({ timestamps: true })
export class Meals extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, default: 0 })
  totalCalories: number;

  @Prop({ required: true, enum: ['breakfast', 'dinner', 'lunch', 'snack'] })
  mealType: string;  

  @Prop()
  notes: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Nutrients' }] })
  nutrients: Nutrients[];
}

export const MealSchema = SchemaFactory.createForClass(Meals);
