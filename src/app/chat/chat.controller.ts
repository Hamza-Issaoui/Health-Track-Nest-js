import { Controller, Post, Body, Get, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './chat.entity';



@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.create(createChatDto);
  }

  @Get(':id')
  async findChatById(@Param('id') id: string): Promise<Chat> {
    return this.chatService.findById(id);
  }

  @Get('user/:id')
  async findChatByUserId(@Param('id') id: string): Promise<Chat[]> {
    return this.chatService.findByUserId(id);
  }

  @Get('user/:userId/date/:date')
  async findChatByDate(
    @Param('userId') userId: string,
    @Param('date') date: string
  ): Promise<Chat[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }
    return this.chatService.findChatByUserAndDate(userId, parsedDate);
  }

  @Get()
  async findAllChats(): Promise<{ message: string, chats: Chat[] }> {
    return await this.chatService.findAll();
  }

  @Patch(':id')
  async updateChatl(
    @Param('id') id: string,
    @Body() updateChatDto: CreateChatDto,
  ): Promise<Chat> {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  deleteChat(@Param('id') id: string) {
    return this.chatService.delete(id);
  }

}
