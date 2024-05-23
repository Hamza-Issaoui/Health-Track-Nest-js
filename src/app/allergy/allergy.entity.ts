import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Allergy extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  severity: string;

  // relation many to one
  @Prop({ type: Types.ObjectId, ref: 'Medical', required: true })
  medical: Types.ObjectId;

}

export const AllergySchema = SchemaFactory.createForClass(Allergy);
