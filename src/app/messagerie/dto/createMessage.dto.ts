import { IsBoolean, IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {

    @IsString()
    readonly message: string;

    @IsBoolean()
    readonly read: boolean;

}
