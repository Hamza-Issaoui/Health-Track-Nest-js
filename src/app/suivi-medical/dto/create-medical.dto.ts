import { Type } from 'class-transformer';
import { ArrayMinSize, IsMongoId, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateAllergyDto } from 'src/app/allergy/dto/allergy.dto';
import { CreateAppointDto } from 'src/app/appointment/dto/create-appointment.dto';
import { CreateMedicationDto } from 'src/app/medication/dto/medication.dto';
import { CreateSymptomDto } from 'src/app/symptom/dto/symptom.dto';

export class CreateMedicalDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly description: string;

  // relation many to one
  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;

  // relation one to many
  @ValidateNested({ each: true })
  @Type(() => CreateSymptomDto)
  @ArrayMinSize(1)
  readonly symptoms: CreateSymptomDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateAllergyDto)
  @ArrayMinSize(1)
  readonly allergies: CreateAllergyDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateMedicationDto)
  @ArrayMinSize(1)
  readonly medications: CreateMedicationDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateAppointDto)
  @ArrayMinSize(1)
  readonly appointments: CreateAppointDto[];
}
