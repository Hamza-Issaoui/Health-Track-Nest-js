
import { Type } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsIn, ValidateNested, ArrayMinSize } from 'class-validator';
import { CreateActivityDto } from 'src/app/activity/dto/create-activity.dto';
import { CreateGoalDto } from 'src/app/goals/dto/create-goal.dto';
import { CreateMealDto } from 'src/app/meals/dto/create-meal.dto';
import { CreateMedicalDto } from 'src/app/suivi-medical/dto/create-medical.dto';

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly phone: number;

  @IsString()
  @IsIn(['Admin', 'Client', 'Coach'])
  readonly role: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  readonly file: string;


  // one to many relation
  @ValidateNested({ each: true })
  @Type(() => CreateActivityDto)
  @ArrayMinSize(1)
  readonly activitiesId: CreateActivityDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateMealDto)
  @ArrayMinSize(1)
  readonly mealsId: CreateMealDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateGoalDto)
  @ArrayMinSize(1)
  readonly goalsId: CreateGoalDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateMedicalDto)
  @ArrayMinSize(1)
  readonly medicalsId: CreateMedicalDto[];
}
