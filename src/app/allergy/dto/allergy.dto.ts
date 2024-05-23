import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(6)
  readonly severity: string;

  // relation many to one
  @IsMongoId()
  @IsNotEmpty()
  readonly medicalId: string;

}
