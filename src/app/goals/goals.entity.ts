import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Goals extends Document {

 @Prop({ required: true })
  weightGoal: number;

  @Prop({ required: true })
  activityGoal: string;

  @Prop({ required: true })
  nutritionGoal: string;

  @Prop({ required: false })
  startDate?: Date;

  @Prop({ required: false })
  endDate?: Date;

  @Prop({ required: false })
  currentWeight?: number;

  @Prop({ required: false })
  targetCalories?: number;

  @Prop({ required: false })
  stepsGoal?: number;

  @Prop({ required: false })
  waterIntakeGoal?: number;

  @Prop({ required: false })
  sleepGoal?: number;

}

export const GoalSchema = SchemaFactory.createForClass(Goals);
