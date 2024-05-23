// user.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Goals } from './goals.entity';
import { CreateGoalDto } from './dto/create-goal.dto';

@Injectable()
export class GoalService {

  constructor(@InjectModel(Goals.name) private goalModel: Model<Goals>) { }

  async create(name: string, description: string,): Promise<Goals> {
    try {
      const newGoal = new this.goalModel({ name, description });
      return await newGoal.save();

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
      const goal = await this.goalModel.findById(id).exec();
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
      const goals = await this.goalModel.find().exec();
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
      const deletedGoal = await this.goalModel.findByIdAndDelete(id).exec();
      if (!deletedGoal) {
        throw new HttpException("Goal not found", HttpStatus.BAD_REQUEST);
      }
      return { message: 'Goal deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
