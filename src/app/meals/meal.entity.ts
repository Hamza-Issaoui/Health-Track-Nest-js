import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NutrientSchema, Nutrients } from '../nutrient/nutrient.entity';


@Schema({ timestamps: true })
export class Meals extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [NutrientSchema] }) 
  nutrients: Nutrients[]; 
}

export const MealSchema = SchemaFactory.createForClass(Meals);
