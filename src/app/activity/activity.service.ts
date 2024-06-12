import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Activities } from './activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Users } from '../users/user.entity';

@Injectable()
export class ActivityService {

  constructor(
    @InjectModel(Activities.name) private activityModel: Model<Activities>,
    @InjectModel(Users.name) private userModel: Model<Users>
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activities> {
    const { userId, type, date, duration, caloriesBurned, location, notes, intensity } = createActivityDto;

    // Create new activity object
    const newActivity = new this.activityModel({
      type, date, duration, caloriesBurned, location, notes, intensity,
      user: userId,
    });

    try {
      const activity = await newActivity.save();
      await this.userModel.findByIdAndUpdate(userId, {
        $push: { activities: activity },
      });

      return activity;
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
        // Supprimer l'activité
        const deletedActivity = await this.activityModel.findByIdAndDelete(id).exec();
        if (!deletedActivity) {
            throw new HttpException("Activity not found", HttpStatus.BAD_REQUEST);
        }

        // Retirer la référence à l'activité de l'utilisateur correspondant
        await this.userModel.findByIdAndUpdate(deletedActivity.user, {
            $pull: { activities: id }
        });

        return { message: 'Activity deleted successfully' };
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
}


}
