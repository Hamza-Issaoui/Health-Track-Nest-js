import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Notifications } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notif.dto';
import { WebSocket } from '../shared/webSocket/webSocketGateway';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notifications.name)
  private notifModel: Model<Notifications>,
    private readonly webSocket: WebSocket,
  ) { }

  async createNotif(createNotifDto: CreateNotificationDto): Promise<any> {
    try {
      const newNotif = new this.notifModel(createNotifDto);
      const savedNotif = await newNotif.save();

      // this.webSocket.emitter('test', 'test2')

      // Emit notification event to WebSocket clients
      this.webSocket.sendNotification(savedNotif);
      console.log("Notification sent to WebSocket clients");

      return {
        status: HttpStatus.CREATED,
        msg: "Notification Created Successfully!",
        notification: savedNotif
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByNotifname(name: string): Promise<Notifications> {
    try {
      const notif = await this.notifModel.findOne({ name }).exec();
      if (!notif) {
        throw new HttpException("Notification not found", HttpStatus.BAD_REQUEST);
      }
      return notif;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Notifications> {
    try {
      const notif = await this.notifModel.findById(id).exec();
      if (!notif) {
        throw new HttpException("Notification not found", HttpStatus.BAD_REQUEST);
      }
      return notif;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllNotifs(): Promise<{ message: string, notifs: Notifications[] }> {
    try {
      const notifs = await this.notifModel.find().exec();
      return { message: 'Notifications retrieved successfully', notifs };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateNotif(id: string, updateNotificationDto: CreateNotificationDto): Promise<Notifications> {
    try {
      const updatedNotif = await this.notifModel.findByIdAndUpdate(id, updateNotificationDto, { new: true }).exec();
      if (!updatedNotif) {
        throw new HttpException("Notification not found", HttpStatus.BAD_REQUEST);
      }
      return updatedNotif;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteNotif(id: string): Promise<{ message: string }> {
    try {
      const deletedNotif = await this.notifModel.findByIdAndDelete(id).exec();
      if (!deletedNotif) {
        throw new HttpException("Notification not found", HttpStatus.BAD_REQUEST);
      }
      return { message: 'Notification deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
