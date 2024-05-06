// user.service.ts

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifications } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notif.dto';


@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notifications.name) private notifModel: Model<Notifications>) {}

   async createNotif(name: string, description: string, ): Promise<Notifications> {
    try {
        const newNotif = new this.notifModel({ name, description });
        return await newNotif.save();

    } catch (error) {
        throw new Error('Failed to create user');
    }
  }

  async findByNotifname(name: string): Promise<Notifications> {
    try {
      const notif = await this.notifModel.findOne({ name }).exec();
      if (!notif) {
        throw new NotFoundException('Notification not found');
      }
      return notif;
    } catch (error) {
      throw new Error('Failed to find notification by name');
    }
  }

  async findById(id: string): Promise<Notifications> {
    try {
      const notif = await this.notifModel.findById(id).exec();
      if (!notif) {
        throw new NotFoundException('User not found');
      }
      return notif;
    } catch (error) {
      throw new NotFoundException('Failed to get notif by id');
    }
  }

 

  async findAllNotifs(): Promise<{ message: string, notifs: Notifications[] }> {
    try {
      const notifs = await this.notifModel.find().exec();
      return { message: 'Notifications retrieved successfully', notifs };
    } catch (error) {
      throw new NotFoundException('Failed to find notifications');
    }
  }

  async updateNotif(id: string, updateNotificationDto: CreateNotificationDto): Promise<Notifications> {
    try {
      const updatedNotif = await this.notifModel.findByIdAndUpdate(id, updateNotificationDto, { new: true }).exec();
      if (!updatedNotif) {
        throw new NotFoundException('User not found');
      }
      return updatedNotif;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async deleteNotif(id: string): Promise<{ message: string }> {
    try {
      const deletedNotif = await this.notifModel.findByIdAndDelete(id).exec();
      if (!deletedNotif) {
        throw new NotFoundException('User not found');
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  } 

}
