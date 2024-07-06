// user.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Goals } from './goals.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Users } from '../users/user.entity';

@Injectable()
export class GoalService {

  constructor(
    @InjectModel(Goals.name) private goalModel: Model<Goals>) { }
  @InjectModel(Users.name) private userModel: Model<Users>

  async create(createGoalDto: CreateGoalDto): Promise<any> {
    const { weightGoal, activityGoal, nutritionGoal, startDate, endDate, currentWeight, height, age, sex, activityLevel, goalType, exerciseDaysPerWeek, exerciseMinutesPerSession, userId } = createGoalDto;

    // Create new goal object
    const newGoal = new this.goalModel({
      weightGoal,
      activityGoal,
      nutritionGoal,
      startDate,
      endDate,
      currentWeight,
      height,
      age,
      sex,
      activityLevel,
      goalType,
      exerciseDaysPerWeek,
      exerciseMinutesPerSession,
      user: userId // Linking goal to the user
    });

    try {
      const goal = await newGoal.save();
      await this.userModel.findByIdAndUpdate(userId, {
        $push: { goals: goal }
      });

      return {
        status: HttpStatus.CREATED,
        msg: 'Meal Created Successfully!',
        goal: goal,
    };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findByname(name: string): Promise<Goals> {
    try {
      const goal = await this.goalModel.findOne({ name }).exec();
      if (!goal) {
        throw new HttpException("Goal not found", HttpStatus.BAD_REQUEST);
      }
      return goal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Goals> {
    try {
      const goal = await this.goalModel.findById(id).populate('user').exec();
      if (!goal) {
        throw new HttpException("Goal not found", HttpStatus.BAD_REQUEST);
      }
      return goal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<{ message: string, goals: Goals[] }> {
    try {
      const goals = await this.goalModel.find().populate('user').exec();
      return { message: 'Goals retrieved successfully', goals };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updategoalDto: CreateGoalDto): Promise<Goals> {
    try {
      const updatedGoal = await this.goalModel.findByIdAndUpdate(id, updategoalDto, { new: true }).exec();
      if (!updatedGoal) {
        throw new HttpException("Goal not found", HttpStatus.BAD_REQUEST);
      }
      return updatedGoal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const goal = await this.goalModel.findById(id).exec();

      const deletedGoal = await this.goalModel.findByIdAndDelete(id).exec();
      if (!deletedGoal) {
        throw new HttpException("Goal not found", HttpStatus.BAD_REQUEST);
      }

      // Remove the goal reference from the user's goals array
      await this.userModel.findByIdAndUpdate(deletedGoal.user, {
        $pull: { goals: goal }
      });

      return { message: 'Goal deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
