import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum ActivityGoal {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

enum NutritionGoal {
  Balanced = 'balanced',
  Keto = 'keto',
  Vegan = 'vegan'
}

enum GoalType {
  WeightLoss = 'weight loss',
  WeightGain = 'weight gain',
  Maintenance = 'maintenance'
}

@Schema({ timestamps: true })
export class Goals extends Document {

  @Prop({ required: true })
  weightGoal: number;

  @Prop({ required: true, enum: ActivityGoal })
  activityGoal: string;

  @Prop({ required: true, enum: NutritionGoal })
  nutritionGoal: string;

  @Prop({ required: false })
  startDate?: Date;

  @Prop({ required: false })
  endDate?: Date;

  @Prop({ required: false })
  currentWeight?: number;

  @Prop({ required: false })
  height?: number;

  @Prop({ required: false })
  age?: number;

  @Prop({ required: false })
  sex?: string;

  @Prop({ required: false, enum: ActivityGoal })
  activityLevel?: string;

  @Prop({ required: false, enum: GoalType })
  goalType?: string;

  @Prop({ required: false })
  exerciseDaysPerWeek?: number;

  @Prop({ required: false })
  exerciseMinutesPerSession?: number;
}

export const GoalSchema = SchemaFactory.createForClass(Goals);
