import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OneToMany } from 'typeorm';
import { Nutrients } from '../nutrient/nutrient.entity';

@Schema()
export class Meals extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @OneToMany(() => Nutrients, (nutritients) => nutritients)
  nutritients : Nutrients[];
}

export const MealSchema = SchemaFactory.createForClass(Meals);
