import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMedicationDto {
    @IsString()
    readonly name: string;

    @IsString()
    @MinLength(6)
    readonly dosage: string;

    @IsNotEmpty()
    readonly frequency: string;

    // relation many to one
    @IsMongoId()
    @IsNotEmpty()
    readonly medicalId: string;
}
