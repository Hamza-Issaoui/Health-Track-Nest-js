// user.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notif.dto';
import { Notifications } from './notification.entity';
import { NotificationService } from './notification.service';

@Controller('notifs')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotif(@Body() createNotifDto: CreateNotificationDto): Promise<Notifications> {
    const { name, description } = createNotifDto;
    return this.notificationService.createNotif(name, description);
  }

   @Get(':id') // Define the route parameter
  async findNotifById(@Param('id') id: string): Promise<Notifications> {
    return this.notificationService.findById(id);
  }
  
  @Get(':name') 
  async findUserByName(@Param('name') name: string): Promise<Notifications> {
    return this.notificationService.findByNotifname(name);
  }

  @Get()
  async findAllNotifications(): Promise<{ message: string, notifs: Notifications[] }> {
    return await this.notificationService.findAllNotifs();
  }

  @Patch(':id')
  async updateNotif(
    @Param('id') id: string,
    @Body() updateNotifDto: CreateNotificationDto,
  ): Promise<Notifications> {
    return this.notificationService.updateNotif(id, updateNotifDto);
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.deleteNotif(id);
  } 
}
