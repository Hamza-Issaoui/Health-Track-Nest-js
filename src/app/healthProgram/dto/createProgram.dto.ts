import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString, } from 'class-validator';


export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  duration: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  notes?: string;

  // many to one relation
  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;

 
}
