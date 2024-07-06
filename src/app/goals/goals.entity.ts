import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

enum ActivityGoal {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

enum NutritionGoal {
  Balanced = 'Balanced',
  Keto = 'Keto',
  Vegan = 'Vegan'
}

enum GoalType {
  WeightLoss = 'Weight Loss',
  WeightGain = 'Weight Gain',
  MusculGain = 'Muscul Gain'
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

  @Prop({ required: false })
  activityLevel?: string;

  @Prop({ required: false, enum: GoalType })
  goalType?: string;

  @Prop({ required: false })
  exerciseDaysPerWeek?: number;

  @Prop({ required: false })
  exerciseMinutesPerSession?: number;

    // many to one relation
    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    user: Types.ObjectId;
}

export const GoalSchema = SchemaFactory.createForClass(Goals);
