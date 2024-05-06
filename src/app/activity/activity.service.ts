// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activities } from './activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';


@Injectable()
export class ActivityService {
  constructor(@InjectModel(Activities.name) private activityModel: Model<Activities>) {}

   async create(name: string, description: string, ): Promise<Activities> {
    try {
        const newActivity = new this.activityModel({ name, description });
        return await newActivity.save();

    } catch (error) {
        throw new Error('Failed to create activity');
    }
  }

  async findByname(name: string): Promise<Activities> {
    try {
      const activity = await this.activityModel.findOne({ name }).exec();
      if (!activity) {
        throw new NotFoundException('Activity not found');
      }
      return activity;
    } catch (error) {
      throw new Error('Failed to find activity by name');
    }
  }

  async findById(id: string): Promise<Activities> {
    try {
      const activity = await this.activityModel.findById(id).exec();
      if (!activity) {
        throw new NotFoundException('Activity not found');
      }
      return activity;
    } catch (error) {
      throw new NotFoundException('Failed to get activity by id');
    }
  }

 

  async findAll(): Promise<{ message: string, activity: Activities[] }> {
    try {
      const activity = await this.activityModel.find().exec();
      return { message: 'Activities retrieved successfully', activity };
    } catch (error) {
      throw new NotFoundException('Failed to find all activities');
    }
  }

  async update(id: string, updateactivityDto: CreateActivityDto): Promise<Activities> {
    try {
      const updatedActivity = await this.activityModel.findByIdAndUpdate(id, updateactivityDto, { new: true }).exec();
      if (!updatedActivity) {
        throw new NotFoundException('cAtivity not found');
      }
      return updatedActivity;
    } catch (error) {
      throw new Error('Failed to update activity');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.activityModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException('Activity not found');
      }
      return { message: 'Activity deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete activity');
    }
  } 

}
