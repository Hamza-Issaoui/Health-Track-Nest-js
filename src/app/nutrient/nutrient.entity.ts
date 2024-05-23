import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Nutrients extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Meals', required: true })
  meal: Types.ObjectId;

}
export const NutrientSchema = SchemaFactory.createForClass(Nutrients);
