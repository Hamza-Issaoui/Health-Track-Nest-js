import { IsBoolean, IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {

    @IsString()
    readonly value: string;

    @IsBoolean()
    readonly seen: boolean;

    @IsNotEmpty()
    @IsMongoId()
    chatId: string;

    @IsNotEmpty()
    @IsMongoId()
    contactId: string;

    @IsNotEmpty()
    @IsMongoId()
    isMine: string;
}
