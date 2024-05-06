import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ManyToOne } from 'typeorm';
import { Meals } from '../meals/meal.entity';

@Schema()
export class Nutrients extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @ManyToOne(() => Meals, (meals) => meals.nutritients)
  meals: Meals ;
}

export const NutrientSchema = SchemaFactory.createForClass(Nutrients);
