import { Controller, Post, Body, Get, Param, Patch, Delete, Put } from '@nestjs/common';
import { MessageService } from './messagerie.service';
import { Messages } from './messagerie.entity';
import { CreateMessageDto } from './dto/createMessage.dto';


@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto): Promise<Messages> {
    return this.messageService.createMessage(createMessageDto);
  }

  @Get(':id')
  async findMessageById(@Param('id') id: string): Promise<Messages> {
    return this.messageService.findById(id);
  }

  @Get(':name')
  async findUserByName(@Param('name') name: string): Promise<Messages> {
    return this.messageService.findByMessageName(name);
  }

  @Get()
  async findAllMessages(): Promise<Messages[]> {
    return await this.messageService.findAllMessages();
  }

  @Patch()
  async updateMessage(
    @Body() body,
  ): Promise<Messages> {
    return this.messageService.updateMessage(body.id, body.message);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.messageService.deleteMessage(id);
  }

  @Put('mark-all-as-read')
  updateAllMessage() {
    return this.messageService.markAllAsRead();
  }

}
