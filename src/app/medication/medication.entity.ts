import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Medications extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    dosage: string;

    @Prop({ required: true })
    frequency: string;

    // relation many to one
    @Prop({ type: Types.ObjectId, ref: 'Medical', required: true })
    medical: Types.ObjectId;

}

export const MedicationSchema = SchemaFactory.createForClass(Medications);
