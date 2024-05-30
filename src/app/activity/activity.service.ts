import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Activities } from './activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivityService {

  constructor(
    @InjectModel(Activities.name) private activityModel: Model<Activities>
  ) { }

  async create(createActivityDto:CreateActivityDto): Promise<Activities> {
    try {
      const { ...userData } = createActivityDto
      const newActivity = new this.activityModel({ userData });
      return await newActivity.save();

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByname(name: string): Promise<Activities> {
    try {
      const activity = await this.activityModel.findOne({ name }).exec();
      if (!activity) {
        throw new HttpException("Activity not found", HttpStatus.BAD_REQUEST);
      }
      return activity;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Activities> {
    try {
      const activity = await this.activityModel.findById(id).exec();
      if (!activity) {
        throw new HttpException("Activity not found", HttpStatus.BAD_REQUEST);
      }
      return activity;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<{ message: string, activity: Activities[] }> {
    try {
      const activity = await this.activityModel.find().exec();
      return { message: 'Activities retrieved successfully', activity };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateactivityDto: CreateActivityDto): Promise<Activities> {
    try {
      const updatedActivity = await this.activityModel.findByIdAndUpdate(id, updateactivityDto, { new: true }).exec();
      if (!updatedActivity) {
        throw new HttpException("Activity not found", HttpStatus.BAD_REQUEST);
      }
      return updatedActivity;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.activityModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new HttpException("Activity not found", HttpStatus.BAD_REQUEST);
      }
      return { message: 'Activity deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
