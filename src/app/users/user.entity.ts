import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

import { NotificationSchema, Notifications } from '../notifications/notification.entity';
import { Medical } from '../suivi-medical/medical.entity';

@Schema({ timestamps: true })
export class Users extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true, default: 'Client', enum: ['Admin', 'Client', 'Coach'] })
  role: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profilePicture: string;

  //one to one relation 
   @Prop({ type: Types.ObjectId, ref: 'Medical' })
   medicalRecord: Medical;

  // many to many relation
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Notifications' }] })
  notifications: Notifications[];
}

export const UserSchema = SchemaFactory.createForClass(Users);
