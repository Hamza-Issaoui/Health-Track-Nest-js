import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAppointDto {
    @IsString()
    readonly date: Date;

    @IsString()
    @MinLength(6)
    readonly description: string;

    @IsString()
    @MinLength(6)
    readonly doctor: string;

    // relation many to one
    @IsMongoId()
    @IsNotEmpty()
    readonly medicalId: string;
}
