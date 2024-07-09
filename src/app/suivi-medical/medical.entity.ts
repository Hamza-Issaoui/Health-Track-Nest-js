import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

import { Medications } from '../medication/medication.entity';
import { Allergy } from '../allergy/allergy.entity';
import { Symptom } from '../symptom/symptom.entity';
import { Appointments } from '../appointment/appointment.entity';
import { Users } from '../users/user.entity';

@Schema({ timestamps: true })
export class Medical extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  // one to one relation
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  user: Types.ObjectId;

  // relation one to many
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Medication' }] })
  medications: Medications[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Allergy' }] })
  allergies: Allergy[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Symptom' }] })
  symptoms: Symptom[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Appointment' }] })
  appointments: Appointments[];

}

export const MedicalSchema = SchemaFactory.createForClass(Medical);
