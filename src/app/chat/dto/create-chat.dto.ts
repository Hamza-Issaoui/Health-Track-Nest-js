import { Type } from 'class-transformer';
import { ArrayMinSize, IsBoolean, IsMongoId, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateMessageDto } from 'src/app/messagerie/dto/createMessage.dto';

export class CreateChatDto {

    @IsString()
    readonly lastMessage: string;

    @IsBoolean()
    readonly unreadCount: number;

    @IsBoolean()
    readonly muted: boolean;

    @IsBoolean()
    readonly lastMessageAt: Date;

    // many to one relation
    @IsMongoId()
    @IsNotEmpty()
    readonly contactId: string;

    @IsMongoId()
    @IsNotEmpty()
    readonly idReceiver: string;

    // one to many relation
    @ValidateNested({ each: true })
    @Type(() => CreateMessageDto)
    @ArrayMinSize(1)
    readonly messages: CreateMessageDto[];
}
