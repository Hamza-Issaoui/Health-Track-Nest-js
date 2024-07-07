import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max, IsMongoId } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

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
  height?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sex?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  activityLevel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  goalType?: string;

  /* @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  exerciseDaysPerWeek?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(10)
  @Max(180)
  exerciseMinutesPerSession?: number; */

  // many to one relation
  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;
}
