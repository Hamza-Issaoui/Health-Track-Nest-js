// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Goals } from './goals.entity';
import { CreateGoalDto } from './dto/create-goal.dto';



@Injectable()
export class GoalService {
  constructor(@InjectModel(Goals.name) private goalModel: Model<Goals>) {}

   async create(name: string, description: string, ): Promise<Goals> {
    try {
        const newGoal = new this.goalModel({ name, description });
        return await newGoal.save();

    } catch (error) {
        throw new Error('Failed to create goal');
    }
  }

  async findByname(name: string): Promise<Goals> {
    try {
      const goal = await this.goalModel.findOne({ name }).exec();
      if (!goal) {
        throw new NotFoundException('Goal not found');
      }
      return goal;
    } catch (error) {
      throw new Error('Failed to find goal by name');
    }
  }

  async findById(id: string): Promise<Goals> {
    try {
      const goal = await this.goalModel.findById(id).exec();
      if (!goal) {
        throw new NotFoundException('Goal not found');
      }
      return goal;
    } catch (error) {
      throw new NotFoundException('Failed to get goal by id');
    }
  }

 

  async findAll(): Promise<{ message: string, goals: Goals[] }> {
    try {
      const goals = await this.goalModel.find().exec();
      return { message: 'Goals retrieved successfully', goals };
    } catch (error) {
      throw new NotFoundException('Failed to find goals');
    }
  }

  async update(id: string, updategoalDto: CreateGoalDto): Promise<Goals> {
    try {
      const updatedGoal = await this.goalModel.findByIdAndUpdate(id, updategoalDto, { new: true }).exec();
      if (!updatedGoal) {
        throw new NotFoundException('Goal not found');
      }
      return updatedGoal;
    } catch (error) {
      throw new Error('Failed to update goal');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deletedGoal = await this.goalModel.findByIdAndDelete(id).exec();
      if (!deletedGoal) {
        throw new NotFoundException('Goal not found');
      }
      return { message: 'Goal deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete goal');
    }
  } 

}
