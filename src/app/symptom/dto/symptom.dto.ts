import { IsDate, IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSymptomDto {
    @IsString()
    readonly name: string;

    @IsString()
    @MinLength(6)
    readonly description: string;

    @IsDate()
    readonly date: Date;

    // relation many to one
    @IsMongoId()
    @IsNotEmpty()
    readonly medicalId: string;
}
