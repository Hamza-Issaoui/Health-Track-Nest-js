// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NotificationSchema, Notifications } from '../notifications/notification.entity';

@Schema({ timestamps: true })
export class Users extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;
 
  @Prop({ required: true })
  phone: number;

  @Prop({ required: true, default: 'client', enum: ['admin', 'client', 'coach'] })
  role: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop() 
  profilePicture: string; 

  @Prop({ type: [NotificationSchema] }) 
  notifications: Notifications[]; 
}

export const UserSchema = SchemaFactory.createForClass(Users);
