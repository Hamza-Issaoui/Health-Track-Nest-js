import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateMedicalDto } from 'src/app/suivi-medical/dto/create-medical.dto';

export class CreateAllergyDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly severity: string;

  // relation many to one
  @IsMongoId()
  @IsNotEmpty()
  readonly medicalId: CreateMedicalDto[];

}
