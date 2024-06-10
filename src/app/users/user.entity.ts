import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

import { NotificationSchema, Notifications } from '../notifications/notification.entity';
import { Medical } from '../suivi-medical/medical.entity';
import { Activities } from '../activity/activity.entity';
import { Meals } from '../meals/meal.entity';
import { Goals } from '../goals/goals.entity';

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



  // many to many relation
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Notifications' }] })
  notifications: Notifications[];

  // one to many relation
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Activity' }] })
  activities: Activities[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Meal' }] })
  meals: Meals[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Goal' }] })
  goals: Goals[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Medical' }] })
  medicals: Medical[];
}

export const UserSchema = SchemaFactory.createForClass(Users);
