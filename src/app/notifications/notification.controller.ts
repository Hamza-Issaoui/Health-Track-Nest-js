import { Controller, Post, Body, Get, Param, Patch, Delete, Put } from '@nestjs/common';

import { CreateNotificationDto } from './dto/create-notif.dto';
import { Notifications } from './notification.entity';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  async createNotif(@Body() createNotifDto: CreateNotificationDto): Promise<Notifications> {
    return this.notificationService.createNotif(createNotifDto);
  }

  @Get(':id')
  async findNotifById(@Param('id') id: string): Promise<Notifications> {
    return this.notificationService.findById(id);
  }

  @Get(':name')
  async findUserByName(@Param('name') name: string): Promise<Notifications> {
    return this.notificationService.findByNotifname(name);
  }

  @Get()
  async findAllNotifications(): Promise<Notifications[]> {
    return await this.notificationService.findAllNotifs();
  }

  @Patch()
  async updateNotif(
    @Body() body,
  ): Promise<Notifications> {
    return this.notificationService.updateNotif(body.id, body.notification);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.deleteNotif(id);
  }

  @Put('mark-all-as-read')
  updateAllNotification() {
    return this.notificationService.markAllAsRead();
  }

}
