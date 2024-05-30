import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGoalDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weightGoal: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  activityGoal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nutritionGoal: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  startDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  endDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  currentWeight?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  targetCalories?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  stepsGoal?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  waterIntakeGoal?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  sleepGoal?: number;
}
