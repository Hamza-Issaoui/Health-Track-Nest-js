import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Appointments extends Document {

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    doctor: string;

    // relation many to one
    @Prop({ type: Types.ObjectId, ref: 'Medical', required: true })
    medical: Types.ObjectId;

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointments);
