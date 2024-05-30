import { IsNotEmpty, IsString, IsDate, IsInt, Min, IsNumber, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  activityId: string;

  @ApiProperty({ enum: ['Running', 'Cycling', 'Swimming', 'Walking'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['Running', 'Cycling', 'Swimming', 'Walking'])
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  caloriesBurned: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ enum: ['Low', 'Moderate', 'High'], required: false })
  @IsOptional()
  @IsString()
  @IsIn(['Low', 'Moderate', 'High'])
  intensity?: string;
}
