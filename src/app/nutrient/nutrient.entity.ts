import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Nutrients extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

}

export const NutrientSchema = SchemaFactory.createForClass(Nutrients);
