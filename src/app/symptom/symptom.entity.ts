import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Symptom extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ type: Types.ObjectId, ref: 'Medical', required: true })
    medical: Types.ObjectId;

}
export const SymptomSchema = SchemaFactory.createForClass(Symptom);
