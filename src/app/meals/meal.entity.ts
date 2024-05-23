import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

import { Nutrients } from '../nutrient/nutrient.entity';


@Schema({ timestamps: true })
export class Meals extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Nutrients' }] })
  nutrients: Nutrients[];
}

export const MealSchema = SchemaFactory.createForClass(Meals);
